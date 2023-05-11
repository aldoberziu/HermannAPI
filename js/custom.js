const banner = document.getElementById("banner-image");
const banner_title_1 = document.getElementById("banner-title-1");
const banner_title_2 = document.getElementById("banner-title-2");
const banner_title_3 = document.getElementById("banner-title-3");

const banner_indicator_1 = document.getElementById("banner-indicator-1");
const banner_indicator_5 = document.getElementById("banner-indicator-5");
const banner_indicator_9 = document.getElementById("banner-indicator-9");
// var banner_reset_pos = banner.style.backgroundPosition;

/*Change photo home*/
changeHomePhoto();
let banner_page_nr = 1;

function changeHomePhotoByClick(new_nr)
{
    banner_page_nr = new_nr - 1;

    if(banner_page_nr == 0)
    {
        // banner.style.backgroundPosition = banner_reset_pos;
        banner.classList.add("banner-image1");
        banner.classList.remove("banner-image2");
        banner.classList.remove("banner-image3");

        banner_title_1.style.display = 'block';
        banner_title_2.style.display = 'none';
        banner_title_3.style.display = 'none';

        banner_indicator_1.classList.add("banner-indicatior-anim");
        banner_indicator_5.classList.remove("banner-indicatior-anim");
        banner_indicator_9.classList.remove("banner-indicatior-anim");

        banner_title_1.classList.add("banner-title-anim");
        banner_title_2.classList.remove("banner-title-anim");
        banner_title_3.classList.remove("banner-title-anim");
    }
    else if(banner_page_nr == 1)
    {
        banner.classList.remove("banner-image1");
        banner.classList.add("banner-image2");
        banner.classList.remove("banner-image3");

        banner_title_1.style.display = 'none';
        banner_title_2.style.display = 'block';
        banner_title_3.style.display = 'none';

        banner_indicator_1.classList.remove("banner-indicatior-anim");
        banner_indicator_5.classList.add("banner-indicatior-anim");
        banner_indicator_9.classList.remove("banner-indicatior-anim");

        banner_title_1.classList.remove("banner-title-anim");
        banner_title_2.classList.add("banner-title-anim");
        banner_title_3.classList.remove("banner-title-anim");

        // banner.style.backgroundPosition = 'right 0rem bottom 3.5rem';
    }
    else if(banner_page_nr == 2)
    {
        banner.classList.remove("banner-image1");
        banner.classList.remove("banner-image2");
        banner.classList.add("banner-image3");

        banner_title_1.style.display = 'none';
        banner_title_2.style.display = 'none';
        banner_title_3.style.display = 'block';

        banner_indicator_1.classList.remove("banner-indicatior-anim");
        banner_indicator_5.classList.remove("banner-indicatior-anim");
        banner_indicator_9.classList.add("banner-indicatior-anim");

        banner_title_1.classList.remove("banner-title-anim");
        banner_title_2.classList.remove("banner-title-anim");
        banner_title_3.classList.add("banner-title-anim");
        // banner.style.backgroundPosition = 'left 2rem bottom 9rem';
    }
}

function changeHomePhoto()
{
    setInterval(() =>
    {
        if(banner_page_nr == 0)
        {
            // banner.style.backgroundPosition = banner_reset_pos;
            banner.classList.add("banner-image1");
            banner.classList.remove("banner-image2");
            banner.classList.remove("banner-image3");

            banner_title_1.style.display = 'block';
            banner_title_2.style.display = 'none';
            banner_title_3.style.display = 'none';

            banner_indicator_1.classList.add("banner-indicatior-anim");
            banner_indicator_9.classList.remove("banner-indicatior-anim");

            banner_title_1.classList.add("banner-title-anim");
            banner_title_2.classList.remove("banner-title-anim");
            banner_title_3.classList.remove("banner-title-anim");
        }
        else if(banner_page_nr == 1)
        {
            banner.classList.remove("banner-image1");
            banner.classList.add("banner-image2");
            banner.classList.remove("banner-image3");

            banner_title_1.style.display = 'none';
            banner_title_2.style.display = 'block';
            banner_title_3.style.display = 'none';

            banner_indicator_1.classList.remove("banner-indicatior-anim");
            banner_indicator_5.classList.add("banner-indicatior-anim");

            banner_title_1.classList.remove("banner-title-anim");
            banner_title_2.classList.add("banner-title-anim");
            banner_title_3.classList.remove("banner-title-anim");
            // banner.style.backgroundPosition = 'right 0rem bottom 3.5rem';
        }
        else if(banner_page_nr == 2)
        {
            banner.classList.remove("banner-image1");
            banner.classList.remove("banner-image2");
            banner.classList.add("banner-image3");

            banner_title_1.style.display = 'none';
            banner_title_2.style.display = 'none';
            banner_title_3.style.display = 'block';

            banner_indicator_5.classList.remove("banner-indicatior-anim");
            banner_indicator_9.classList.add("banner-indicatior-anim");

            banner_title_1.classList.remove("banner-title-anim");
            banner_title_2.classList.remove("banner-title-anim");
            banner_title_3.classList.add("banner-title-anim");
            // banner.style.backgroundPosition = 'left 2rem bottom 9rem';
        }

        banner_page_nr++;

        if(banner_page_nr > 2)
            banner_page_nr = 0;
    }, 4000);
}

// Parallex effect for banner
let title = document.getElementById('banner');

window.addEventListener('scroll', function(){
    let value = window.scrollY;
    title.style.top = value * -0.5 + 'px';
})

//hover and size icons up at learn more
function sizeIconUp(nr)
{
    var nameToLookFor = "icon" + nr.toString();

    document.getElementById(nameToLookFor).classList.remove("sizeIconDown");
    document.getElementById(nameToLookFor).classList.add("sizeIconUp");
}

function sizeIconDown(nr)
{
    var nameToLookFor = "icon" + nr.toString();

    document.getElementById(nameToLookFor).classList.remove("sizeIconUp");
    document.getElementById(nameToLookFor).classList.add("sizeIconDown");
}