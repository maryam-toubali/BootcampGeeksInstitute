// Ch:
//
class Video {
  constructor (title, uploader, time){
    this.title = title;
    this.uploader = uploader;
    this.time = time;  
  }
  
  watch() {
    console.log(`${this.uploader} watched all ${this.time} seconds of "${this.title}"!`);
  }
}
const video1 = new Video('Learn JavaScript', 'Sara', 300);
video1.watch();
const video2 = new Video('Learn Python', 'Zineb', 200);
video2.watch();

const videos = [
  ["Punch needls", "Hiba", 300],
  ["Cooking Pasta", "Halima", 600],
  ["Travel Vlog", "Houria", 900],
  ["Workout Tips", "Hajar", 400],
  ["Movie Review", "Oumayma", 500]
];

const videoList = videos.map(([title, uploader, time]) =>
new Video(title, uploader, time));
videoList.forEach(video => video.watch());

// const videoInstances = [];
// videosData.forEach(data => {
//   const [title, uploader, time] = data;
//   const video = new Video(title, uploader, time);
//   videoInstances.push(video);
// });










