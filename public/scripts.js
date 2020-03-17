const currentPage = location.pathname;
const menuItens = document.querySelectorAll("header .menu a")

for (item of menuItens){
    if(currentPage.includes(item.getAttribute("href"))){
        item.classList.add("active")
    }
}


function paginate (selectedPage, totalPage) {
        
        let pages=[],
        oldPage
    
        for(let currentPage = 1; currentPage <= totalPage; currentPage ++){
            
            const firstPage = currentPage ==  1
            const fistPageAndLastPage = currentPage ==  1 || currentPage == totalPage
            const pagesAffterSelectedPage= currentPage <= selectedPage + 2
            const pagesBeforeSelectedPage = currentPage >= selectedPage -2
            
            if(fistPageAndLastPage || pagesAffterSelectedPage && pagesBeforeSelectedPage) {
                
                if (oldPage && currentPage - oldPage >2) {
                    pages.splice(1,0,2)
                    pages.splice(2,1)
                    pages.push("...")
                    
                    
                }
                if (oldPage && currentPage - oldPage ==2){
                    pages.push(oldPage + 1)
                }
                pages.push(currentPage)
                oldPage = currentPage
            }
        }

        return pages
    }
        

const pagination = document.querySelector(".pagination")
const page = +pagination.dataset.page
const total = +pagination.dataset.total
const filter = pagination.dataset.filter

const pages = paginate(page, total)

let elements = ""

for (let page of pages){
    if(String(page).includes("...")){
        elements += `<span> ${page} </span>`
    }else{
        if(filter){

            elements +=`<a href="?page=${page}&filter=${filter}">${page}</a>`
        }else{
            
            elements +=`<a href="?page=${page}">${page}</a>`
        }
    }
}


pagination.innerHTML = elements


console.log(pages)
            
        

