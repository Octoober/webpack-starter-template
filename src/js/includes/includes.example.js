/**
 * Example
 *
 */

let api_json = 'https://vuue.ru/webpack/api',
    package_json = '../../package.json';

let packages_el = $('#u-package'),
    count_el = $('#package-count'),
    project_url = $('#link-github'),
    header_el = $('header.header'),
    last_commit_el = $('.last-commit');

$.getJSON(package_json, function (data) {
    let dev = data.devDependencies;

    count_el.html(Object.keys(dev).length);

    for (let key in dev) {
        packages_el.append('<li>' + key + ' => ' + dev[key].replace('^', '') + '</li>');
    }
});

/* API */
$.getJSON(api_json, function (data) {
    let author = data.author,
        project = data.project;

    project_url.attr('href', project.url);


    last_commit_el.html('<a target="_blank" title="' + project.current_commit.date + '" href="' + project.current_commit.url + '">' + project.current_commit.message + '</a>');

    header_el.append('<a href="' + author.site + '" target="_blank" class="js-author">' + author.login + ' / ' + author.name + '</a>');


    $('.js-author').css({
        position: 'absolute',
        top: '10px',
        right: '10px',
        fontSize: '13px',
        color: '#565656b5'
    });
});


