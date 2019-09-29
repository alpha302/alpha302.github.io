const ap = new APlayer({
    container: document.getElementById('aplayer'),
    fixed: true,
    autoplay: false,
    audio: [
      {
        name: "爱的飞行日记",
        artist: '哆啦',
        url: 'https://tj-ctfs.ftn.qq.com/ftn_handler/9fba884d99721a84a04ef9699c812d971c523f9ed8d46643c07e2d43f40591629db98cb2d0ec1d36b7d79607d96a2ca82e2b526531b6b0340cea7271c0aef9e5/?fname=1.mp3',
        cover: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000000NE0yF0rjzaA.jpg?max_age=2592000',
      },
    ]
});