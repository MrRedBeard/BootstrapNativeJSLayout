window.addEventListener('load', () => 
{
    //Side Menu Toggle
    const sideMenuCtrl = document.querySelector('.side-menu-control');
    if(sideMenuCtrl)
    {
        sideMenuCtrl.addEventListener('click', () =>
        {
            document.querySelector('.side-menu').classList.toggle('collapsed');
        });
    }

    //Top Nav
    topNavListeners();

    if(window.location.hash === '')
    {
        history.pushState(null, document.title, window.location.href.replace('#', ''));
    }

    if(!localStorage.getItem('pageLoaded') || localStorage.getItem('pageLoaded') !== window.location.href)
    {
        localStorage.setItem('pageLoaded', window.location.href);
        localStorage.setItem('scrollPosition', 0);
    }

    //When scroll change, you save it on localStorage.
    document.querySelector('main').addEventListener('scroll',function(e) 
    {
        let currentScrollPosition = document.querySelector('main').scrollTop;

        let location = window.location.href;

        if(window.location.hash)
        {
            location = location.replace(window.location.hash, '');

            //Scroll Change since anchor tag
            let top = document.querySelector(window.location.hash).offsetTop; //Getting Y of target element
            top = top - document.querySelector('main').offsetTop;

            //Distance scrolled from anchor
            if(Math.abs(currentScrollPosition - top) > 300)
            {
                //window.location.hash = null;
                history.pushState(null, document.title, location);
                localStorage.setItem('pageLoaded', window.location.href);
            }
        }

        // history.pushState(null, document.title, location);
        localStorage.setItem('scrollPosition', document.querySelector('main').scrollTop);
    }, false);

    //When reload scroll to stored position
    if(localStorage.getItem('scrollPosition') !== null)
    {
        document.querySelector('main').scrollTo(0, localStorage.getItem('scrollPosition'));
    }

    //Anchor tag position
    if(window.location.hash)
    {
        let top = document.querySelector(window.location.hash).offsetTop; //Getting Y of target element
        top = top - document.querySelector('main').offsetTop; //Account for container
        document.querySelector('main').scrollTo(0, top);
    }
}, false);

window.addEventListener('popstate', (event) =>
{
	if(window.location.hash === '')
    {
        document.querySelector('main').scrollTo(0, top);
        history.pushState(null, document.title, window.location.href.replace('#', ''));
    }

    if(!localStorage.getItem('pageLoaded') || localStorage.getItem('pageLoaded') !== window.location.href || window.location.hash === '')
    {
        localStorage.setItem('pageLoaded', window.location.href);
        localStorage.setItem('scrollPosition', 0);
    }

    //Anchor tag position
    if(typeof window.location.hash !== 'undefined' && window.location.hash !== null && window.location.hash && window.location.hash !== '' && window.location.hash !== '#null')
    {
        var top = document.querySelector(window.location.hash).offsetTop; //Getting Y of target element
        top = top - document.querySelector('main').offsetTop; //Account for container
        document.querySelector('main').scrollTo(0, top);
    }
});

let observer = new MutationObserver(function(mutations) 
{
    mutations.forEach(function(mutation) 
    {
      if (mutation.removedNodes.length) 
      {
        topNavListeners();
        //console.log("removed nodes", mutation.removedNodes[0].nodeValue);
      }
  
      if (mutation.addedNodes.length) 
      {
        topNavListeners();
        //console.log("added nodes", mutation.addedNodes[0].nodeValue);
      }
    });
  });
  
let observerConfig = {
    childList: true,
    subtree: true,
    characterData: true
};

window.addEventListener('load', () => 
{
    const topNav = document.querySelector('.navbar-collapse');
    observer.observe(topNav, observerConfig);
});

function topNavListeners()
{
    //Top Nav
    const topNav = document.querySelector('.navbar-collapse');
    let links = Array.from(topNav.querySelectorAll('a'));
    links.forEach((link) =>
    {
        link.onclick = () =>
        {
            if(topNav.classList.contains('show') && !link.classList.contains('dropdown-toggle'))
            {
                topNav.classList.toggle('show');
            }
        }
    });
}