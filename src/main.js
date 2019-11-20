const $siteList = $('.siteList');
const $lastLi = $siteList.find('li.last');
const x = localStorage.getItem('x'); //读取缓存
const xObject = JSON.parse(x)
const hashMap = xObject || [];
//简化输入的url
const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '') //正则表达式，删除所有以/开头的内容
}

const render = () => {
    hashMap.forEach((node, index) => {
        const $li = $(`<li class="new">
            <div class="site">
                <div class="logo">${node.logo}</div>
                    <span class="link">${simplifyUrl(node.url)}</span>
                        <div class="close">
                        <svg class="icon">
                        <use xlink:href="#icon-close"></use>
                    </svg>
                    </div>
                </div>
        </li>`).insertBefore($lastLi) //不用a标签：为了阻止点击close时打开网页
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation()
            hashMap.splice(index, 1)
            $siteList.find('li.new').remove();
            render()
        })
    })
}

render();

$('.add').on('click', () => {
    let $url = window.prompt('请输入你要添加的网址')
    if ($url.indexOf('http') !== 0) {
        $url = 'http://' + $url;
    }
    hashMap.push({
        logo: simplifyUrl($url)[0].toUpperCase(),
        url: $url
    })
    $siteList.find('li.new').remove();
    render();
})

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap);
    localStorage.setItem('x', string) //自动保存
}
$(document).on('keypress', (x) => {
    const { key } = x; //const key = x.key
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            setTimeout(() => window.open(hashMap[i].url), 0) 
        }
    }
})
