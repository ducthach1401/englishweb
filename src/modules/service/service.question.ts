import fetch from 'cross-fetch';
import cheerio from 'cheerio';
import Quest from './../model/model.question'
import { data } from 'cheerio/lib/api/attributes';

export class questionService {
    async crawlData(page: Number): Promise<any>{
        const data = await fetch('https://600tuvungtoeic.com/index.php?mod=lesson&id=' + page).then(data => data.text());
        const $ = cheerio.load(data);
        let totalResult: any = [];
        const title = $('.page-title').text().split(':')[1].split('-')[0].trim();
        $('.noidung').each((i, element) => {
            let test: any = $(element).text().split('\t').filter(data => {
                if ((data.length > 0)){
                    if (data != "\n"){
                        return data;
                    }
                }
            });
            let vietnam:any =  $(element).find('b');
            vietnam = vietnam.text().trim().replace(vietnam.children().text().trim(), '').trim();
            const result = {
                english: test[0].split('/')[0].trim(),
                vietnamese: test[2].split(':')[2].trim(),
                type: test[2].split(':')[1].trim(),
                meaning: test[1].split(':')[1].trim(),
                exampleEnglish: test[3].split(':')[1].trim().replace(vietnam, '').trim(),
                exampleVietnamese: vietnam,
                category: title
            }
            totalResult.push(result);
            // test = test.toString(' ');
            // console.log(vietnam);
        });
        // console.log(totalResult);
        return totalResult;
    }

    async saveCrawl(): Promise<any>{
        for (let i = 1; i <= 50; i++){
            const result: any = await this.crawlData(i);
            console.log(i);
            for await (let data of result){
                const check = await Quest.findOne({
                    english: data.english
                });
                if (!check){
                    console.log(data.english);
                    const saveData = new Quest(data);
                    await saveData.save();   
                }
            }
        }
    }

    async getQuestion(data: any): Promise<any> {
        try {
            const size = (data.size)?data.size:10;
            const page = (data.page)?data.page:1;
            const question = await Quest.find(data)
            .limit(size)
            .skip((page - 1) * size);
            console.log(question);
            return question;
        } catch (error) {
            throw error;
        }
    }

    async getAll(): Promise<any>{
        try {
            const result = await Quest.find({
                isDelete: false
            });
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getOne(data: any): Promise<any> {
        try {
            const result = await Quest.findOne(data);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async updateQuestion(data: any, filter: any): Promise<any> {
        try {
            const check = await Quest.findOne(filter);
            if (!check){
                return null;
            }
            const result = await Quest.updateOne(filter, data);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async deleteQuestion(filter: any): Promise<any> {
        try {
            const check = await Quest.findOne(filter);
            if (!check){
                return null;
            }
            const result = await Quest.updateOne(filter, {
                isDelete: true
            });
            return result;
        } catch (error) {
            throw error;
        }
    }

    async createTestCategory(category: any): Promise<any> {
        try {
            const answerAll = await Quest.find({
                isDelete:false
            });
            const getQuestions = await Quest.find(category);
            let result: any = [];
            for (let quest of getQuestions){
                const temp = await this.createMultipleChoice(quest, answerAll);
                result.push(temp);
            }
            console.log(result);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async createTest(): Promise<any> {
        try {
            const answer = await Quest.find({
                isDelete:false
            });
            let temp = await Quest.find();
            temp = await this.shuffle(temp);
            let count = 0;
            let result: any = [];
            for (let question of temp){
                count ++;
                const getQuestion = await this.createMultipleChoice(question, answer);
                result.push(getQuestion);
                if (count == 50){
                    break;
                }
            }
            return result;
        } catch (error) {
            throw error;
        }
    }

    async checkResult(data: any): Promise<any> {
        try {
            const result = await Quest.findOne({
                vietnamese: data.vietnamese,
                isDelete: false
            });
            if (!result){
                throw new Error('Not Found');
            }
            if (result.english == data.english){
                return true;
            }
            else {
                return false;
            }
        } catch (error) {
            throw error;
        }
    }

    async createMultipleChoice(data: any, answer: any): Promise<any>{
        try {
            const result: any = {
                question: data.vietnamese,
                answers: []
            }
            let temp: any = [];
            let random = Math.floor(Math.random() * 4);
            answer = answer.filter((answer: any) => {
                const lengthData = data.english.split(' ').length;
                const lengthAnswer = answer.english.split(' ').length;
                if ((lengthData > 2) && (lengthAnswer >= 2)){
                    return answer;
                }
                if (lengthAnswer == lengthData){
                    return answer;
                }
            });
            if (answer.length >= 4){
                let answerTemp = answer.filter((answer: any) => {
                    if ((data.type == '(v, n)') && (answer.type == '(v)')){
                        return answer;
                    }

                    if ((data.type == '(v, n)') && (answer.type == '(n)')){
                        return answer;
                    }

                    if (answer.type == data.type){
                        return answer;
                    } 
                });
                if (answerTemp.length >= 4){
                    answer = answerTemp.slice();
                }
            }
            result.answers.push(data.english);
            for (let i = 0; i < 3; i++){
                let randomAnswer = Math.floor(Math.random() * answer.length);
                while ((temp.includes(randomAnswer)) || (data.english == answer[randomAnswer].english)){
                    randomAnswer = Math.floor(Math.random() * answer.length);
                }
                temp.push(randomAnswer);
                result.answers.push(answer[randomAnswer].english);
            }
            result.answers = await this.shuffle(result.answers);
            result.true = data.english;
            return result;
        } catch (error) {
            throw error;
        }
    }
    async shuffle(array: any): Promise<any> {
        try {
            var currentIndex = array.length, temporaryValue, randomIndex;
            while (0 !== currentIndex) {
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex -= 1;
              temporaryValue = array[currentIndex];
              array[currentIndex] = array[randomIndex];
              array[randomIndex] = temporaryValue;
            }
            return array;
        } catch (error) {
            throw error;
        }
    }
}

