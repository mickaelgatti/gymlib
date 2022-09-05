import fetch from "node-fetch";
import * as fs from 'fs';


export async function get_id(){
  const promise = new Promise(async (resolve,reject)=>{
    const response = await fetch("https://hngraphql.fly.dev/graphql", {
      body: "{\"query\":\"{storyPage(name:TOP)}\"}",
        headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  })
    const body = await response.text();
    resolve({
      "res": body
    });
  })
  const testing = await promise;
  let new_file_string = testing.res.slice(22,testing.res.length - 3);//TMP is the string acquired from the request - removing excess characters
  let new_file = new_file_string.split(',');
  let dir = './data';//creation of a data directory
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
  if (fs.existsSync(dir)){
    //if 'data.id' doesn't exist := creation.
    if (!fs.existsSync("data/id")){
      fs.writeFile("data/id", new_file, (err) => {
        if (err) {
          console.log(err)
        }
      });
    }
    else {
      let tmp = fs.readFileSync("data/id", "UTF8");//Reformating text string into usable array.
      let old_file = tmp.split(',');
      console.log("NEW ID: # present in API but not present last time");
      for (let ids of new_file) {
        if (!old_file.includes(ids)) {
          console.log('\t' + ids);
        }
      }
      console.log("OLD ID: # not present in API but present the last time");
      for (let ids of old_file) {
        if (!new_file.includes(ids)) {
          console.log('\t' + ids);
        }
      }
      fs.writeFile("data/id", new_file_string, (err) => {
        if (err) {
          console.log(err)
        }
      });
    }
  }
}