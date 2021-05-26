document.addEventListener('DOMContentLoaded', function () {
    const navigation = document.querySelectorAll('nav button')
    const menuOverlay = document.querySelector('.menu-overlay')
    const menuContainer = document.querySelector('.menus')
    const menus = document.querySelectorAll('.menu')
    const menuActions = document.querySelectorAll('.menus a, .menus button')
    const menuClosers = document.querySelectorAll('.menus .menu-closer')

    for (let a = 0; a < menuActions.length; a++) {
        menuActions[a].setAttribute('tabindex', '-1')
    }

    for (let i = 0; i < navigation.length; i++) {
        navigation[i].addEventListener('click', function () {
            var elem = this

            if (this.classList.contains('menu-open')) {
                //Close Menu
                closeMenu(elem)
                return
            }

            //Open menu
            openMenu(elem)
        })
    }

    for (let b = 0; b < menuClosers.length; b++) {
        menuClosers[b].addEventListener('click', function () {
            let elem = document.querySelector('.menu.menu-open')
            closeMenu(elem)
        })
    }

    menuOverlay.addEventListener('click', function () {
        //Close Menu
        let elem = document.querySelector('.menu.menu-open')
        closeMenu(elem)
    })

    function openMenu(elem) {
        for (let m = 0; m < menus.length; m++) {
            menus[m].classList.remove('menu-open')
            menus[m].setAttribute('aria-hidden', true)
            menus[m].setAttribute('aria-expanded', false)
            menus[m].setAttribute('tabindex', 0)
        }

        for (let n = 0; n < navigation.length; n++) {
            navigation[n].classList.remove('menu-open')
        }

        for (let a = 0; a < menuActions.length; a++) {
            menuActions[a].setAttribute('tabindex', '-1')
        }

        menuContainer.classList.remove('menu-closing')
        document.body.classList.add('navigation-open')
        menuOverlay.classList.add('menu-open')
        elem.classList.add('menu-open')

        let selectedID = elem.dataset.pair
        let selectedMenu = menuContainer.querySelector('.menu[data-pair="' + selectedID + '"]')
        let selectedMenuActions = selectedMenu.querySelectorAll('a, button')

        selectedMenu.classList.add('menu-open')
        selectedMenu.setAttribute('aria-hidden', false)
        selectedMenu.setAttribute('aria-expanded', true)
        selectedMenu.setAttribute('tabindex', 0)

        for (let s = 0; s < selectedMenuActions.length; s++) {
            selectedMenuActions[s].setAttribute('tabindex', 0)
        }
    }

    function closeMenu(elem) {
        for (let m = 0; m < menus.length; m++) {
            menus[m].classList.remove('menu-open')
            menus[m].setAttribute('aria-hidden', true)
            menus[m].setAttribute('aria-expanded', false)
            menus[m].setAttribute('tabindex', 0)
        }

        for (let n = 0; n < navigation.length; n++) {
            navigation[n].classList.remove('menu-open')
        }

        for (let a = 0; a < menuActions.length; a++) {
            menuActions[a].setAttribute('tabindex', '-1')
        }

        menuContainer.classList.add('menu-closing')
        document.body.classList.remove('navigation-open')
        menuOverlay.classList.remove('menu-open')
        elem.classList.remove('menu-open')
    }

    const menuTabs = document.querySelectorAll('.menu-navigation-link')

    if (menuTabs) {
        for (let i = 0; i < menuTabs.length; i++) {
            const tab = menuTabs[i]

            tab.addEventListener('click', function () {
                const tabPair = tab.dataset.pair
                const tabId = tab.dataset.id
                const menuTabsByPair = document.querySelectorAll('.menu-navigation-link[data-pair="' + tabPair + '"]')
                const menuPanelsByPair = document.querySelectorAll(
                    '.menu-navigation-panel[data-pair="' + tabPair + '"]'
                )

                for (let i = 0; i < menuTabsByPair.length; i++) {
                    const t = menuTabsByPair[i]
                    t.classList.remove('menu-navigation-link--open')
                }

                for (let i = 0; i < menuPanelsByPair.length; i++) {
                    const panel = menuPanelsByPair[i]
                    panel.classList.remove('menu-navigation-panel--open')
                    panel.setAttribute('tabindex', '-1')
                }

                tab.classList.add('menu-navigation-link--open')
                const activePanel = document.querySelector(
                    '.menu-navigation-panel[data-pair="' + tabPair + '"][data-id="' + tabId + '"]'
                )
                console.log(tabPair, tabId)
                activePanel.classList.add('menu-navigation-panel--open')
            })
        }
    }
})
