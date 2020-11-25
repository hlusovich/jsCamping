function createList(title, list) {
    function createSubList(title, list, elem, fontSize) {
        const fragment = document.createDocumentFragment();
        const h2 = document.createElement("h2");
        h2.innerText = title;
        h2.style.fontSize = `${fontSize}px`;
        list.map(item => {
            const li = document.createElement('li');
            li.innerHTML = `<span style="cursor: pointer">${item.value}</span>`;
            if (Array.isArray(item.children)) {
                createSubList(title, item.children, li, fontSize * 0.9);
            }
            fragment.appendChild(li);
        });
        const ul = document.createElement("ul");
        ul.style.fontSize = `${fontSize}px`;
        ul.appendChild(fragment);
        elem.appendChild(h2);
        elem.appendChild(ul);
    }

    function hideListElements(elem, index) {
        if (index > 0) {
            if (elem.style.display === "none") {
                elem.style.display = "block";
            } else {
                elem.style.display = "none";
            }
        }
    }
    createSubList(title, list, document.body, 40);
    const firstUl = document.body.getElementsByTagName('ul')[0];
    firstUl.addEventListener("click", (e) => {
        if (e.target.localName === "span") {
            const children = e.target.parentNode.childNodes;
            Array.from(children, hideListElements);
        }
    });
}

const arr = [
    {
        value: 'Пункт 1.',
        children: null,
    },
    {
        value: 'Пункт 2.',
        children: [
            {
                value: 'Подпункт 2.1.',
                children: null,
            },
            {
                value: 'Подпункт 2.2.',
                children: [
                    {
                        value: 'Подпункт 2.2.1.',
                        children: null,
                    },
                    {
                        value: 'Подпункт 2.2.2.',
                        children: null,
                    }
                ],
            },
            {
                value: 'Подпункт 2.3.',
                children: null,
            }
        ]
    },
    {
        value: 'Пункт 3.',
        children: null,
    }
];
