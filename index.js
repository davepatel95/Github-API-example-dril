'use strict';


function getUserRepos(username) {
    let URL = `https://api.github.com/users/${username}/repos`;

    fetch(URL)
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })

        .then(data => displayUserRepos(data))

        .catch(error => {
            $('.results-list').append(
                `Soemthing went wrong: ${error.message}`
            );
        })
}

function displayUserRepos(data) {
    console.log(data);

    for(let i =0; i<data.length;i++) {
        $('.results-list').append(
        `<li><a href="${data[i].html_url}">${data[i].name}</a></li>`
    )
    };

    $('.results-list').removeClass('hidden');
}

function watchForm() {
    $('.repo-form').submit(event => {
        event.preventDefault();
        let username = $('.user-name').val();

        getUserRepos(username);
        $('.user-name').val('');
        $('.results-list').empty();
    })
}

$(watchForm);