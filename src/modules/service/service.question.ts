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
                    'english': data.english
                });
                if (!check){
                    console.log(data.english);
                    const saveData = new Quest(data);
                    await saveData.save();   
                }
            }
        }
    }

    async getQuestion(data: any, page: any, size: any): Promise<any> {
        try {
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
            const result = await Quest.find();
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

    async createTestCategory(): Promise<any> {
        try {
            
        } catch (error) {
            throw error;
        }
    }

    async createTest(): Promise<any> {
        try {
            
        } catch (error) {
            throw error;
        }
    }
}
// const test = new questionService();
// test.saveCrawl();