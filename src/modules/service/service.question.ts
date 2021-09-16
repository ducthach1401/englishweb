import fetch from 'cross-fetch';
import cheerio from 'cheerio';
import Quest from './../model/model.question'

export class questionService {
    async createQuestion(page: Number): Promise<any>{
        const data = await fetch('https://600tuvungtoeic.com/index.php?mod=lesson&id=' + page).then(data => data.text());
        const $ = cheerio.load(data);
        let totalResult: any = [];
        $('.noidung').each((i, element) => {
            let test: any = $(element).text().split('\t').filter(data => {
                if ((data.length > 0)){
                    if (data != "\n"){
                        return data;
                    }
                }
            });
            const result = {
                english: test[0].split('/')[0].trim(),
                vietnamese: test[2].split(':')[2].trim(),
                type: test[2].split(':')[1].trim(),
                meaning: test[1].split(':')[1].trim(),
                exampleEnglish: test[3].split(':')[1].trim().split('.')[0],
                exampleVietnamese: $(element).find('b').text().trim()
            }
            totalResult.push(result);
            // console.log(totalResult);
            // test = test.toString(' ');
        });
        // console.log(totalResult);
        return totalResult;
    }

    async saveQuestion(): Promise<any>{
        for (let i = 1; i <= 50; i++){
            const result: any = await this.createQuestion(i);
            console.log(i);
            for await (let data of result){
                const check = await Quest.findOne({
                    'english': data.english
                });
                if (!check){
                    const saveData = new Quest(data);
                    await saveData.save();   
                }
            }
        }
    }
}

// const test = new questionService().saveQuestion();