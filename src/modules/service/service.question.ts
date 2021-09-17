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
            const vietnam =  $(element).find('b').text().trim();
            const result = {
                english: test[0].split('/')[0].trim(),
                vietnamese: test[2].split(':')[2].trim(),
                type: test[2].split(':')[1].trim(),
                meaning: test[1].split(':')[1].trim(),
                exampleEnglish: test[3].split(':')[1].trim().replace(vietnam, ''),
                exampleVietnamese: vietnam,
                catalogy: title
            }
            totalResult.push(result);
            // test = test.toString(' ');
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

    async getQuestion(data: any): Promise<any> {
        try {
            const question = await Quest.find({
                type: '(v)'
            });
            console.log(question);
            return question;
        } catch (error) {
            throw error;
        }
    }
}
const test = new questionService();
test.getQuestion({});