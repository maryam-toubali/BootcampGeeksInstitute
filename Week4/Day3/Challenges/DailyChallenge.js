// Ch:
//
class Video {
  constructor(title, uploader, time) {
    this.title = title;
    this.uploader = uploader;
    this.time = time; 
  }

  watch() {
    console.log(`${this.uploader} watched all ${this.time} seconds of ${this.title}!`);
  }
}

const video1 = new Video("Learn JavaScript", "Alice", 300);
video1.watch();

const video2 = new Video("Cooking Pasta", "Bob", 600);
video2.watch(); 
//array with video data
const videosData = [
  ["Learn JS", "Alice", 300],
  ["Cooking Pasta", "Bob", 600],
  ["Travel Vlog", "Charlie", 900],
  ["Workout Tips", "Diana", 400],
  ["Movie Review", "Eve", 500]
];
const videoInstances = [];
//
videosData.forEach(data => {
  const [title, uploader, time] = data;
  const video = new Video(title, uploader, time);
  videoInstances.push(video);
});

// Call watch() for each video instance
videoInstances.forEach(video => video.watch());
