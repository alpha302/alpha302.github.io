const ap = new APlayer({
    container: document.getElementById('aplayer'),
    fixed: true,
    autoplay: false,
    audio: [
      {
        name: "爱的飞行日记",
        artist: '哆啦',
        url: 'http://www.ytmp3.cn/down/69940.mp3',
        cover: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000000NE0yF0rjzaA.jpg?max_age=2592000',
      },
    ]
});