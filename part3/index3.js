'use strict'
//Объявляем переменные для кнопки и места ввода постов
const button = document.getElementById("button");
const posts = document.getElementById("posts");

//Создаем функцию, которая будет возвращать значение заголовка
function getHeader() {
    const header = document.querySelector('.header');
    if (header.value === '') {
        alert('Введите заголовок');
    }
    return header.value;
}

//Создаем функцию, которая будет возвращать содержание поста
function getPost() {
    const post = document.querySelector('.post');
    if (post.value === '') {
        alert('Введите текст поста');
    }
    return post.value;
}

//Создаем функцию, которая будет создавать секцию под пост, в которой будут заголовок и содержание. Добавлять им классы и значения. Вкладывать элементы в родительские элементы
function createPost(header, post) {
    const section = document.createElement('section');
    section.className = 'publishedPost';
    const header2 = document.createElement('h2');
    header2.className = 'publishedPost__header';
    header2.innerText = header;
    const postText = document.createElement('p');
    postText.className = 'publishedPost__text';
    postText.innerText = post;


    section.appendChild(header2);
    section.appendChild(postText);
    posts.appendChild(section);
}

//Создаем функцию, которая будет очищать поле ввода
function cleanInputs() {
    document.querySelector('.header').value = '';
    document.querySelector('.post').value = '';
}

//Создаем функцию, которая будет добавлять элементы на страницу через метод POST, собирая значения из предыдущих функций
function setPost() {

    const header = getHeader();
    const post = getPost();


    fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: header,
                body: post,
                userId: 1,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
        .then((response) => response.json())
        .then((json) => createPost(json.title, json.body));

    cleanInputs();
}

//Слушатель для кнопки
button.addEventListener('click', setPost);