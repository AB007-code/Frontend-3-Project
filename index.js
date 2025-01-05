const container = document.querySelector(".table")
const searchInput = document.querySelector(".search")
const mktBtn = document.querySelector(".mktBtn")
const perBtn = document.querySelector(".perBtn")
let arr = []
let sort_arr = []
let sort_arr1 = []
let sort_mktCap = sort_arr.sort((a,b)=>(a-b))
let sort_perCap = sort_arr1.sort((a,b)=>(a-b))
async function fetchData(){
 const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false")
 const data = await res.json()
 data.forEach((ele)=>{
  arr.push(ele)
  sort_arr.push(ele.market_cap)
  sort_arr1.push(ele.price_change_percentage_24h)
 })
 getData(data)
 mktBtn.addEventListener("click",()=>{
    sort_mktCap = sort_mktCap.reverse()
    let arr2 = []
     sort_mktCap.filter((ele)=>{
     for(let i=0; i<=arr.length-1; i++){
        if(ele==arr[i].market_cap){
            arr2.push(arr[i])
        }
     }
    })
    getData(arr2)
 })
 perBtn.addEventListener("click",()=>{
    sort_perCap = sort_perCap.reverse()
    let arr2 = []
     sort_perCap.filter((ele)=>{
     for(let i=0; i<=arr.length-1; i++){
        if(ele==arr[i].price_change_percentage_24h){
            arr2.push(arr[i])
        }
     }
    })
    getData(arr2)
 })
}
fetchData()
function getData(data){
    let collection=""
    data.forEach((ele)=>{
      collection+= `<div class="row text-white fs-5 border-bottom" >
         <div class="col-2 py-4"><img src=${ele.image}/> ${ele.name}</div>
         <div class="col-1 py-4 text-start">${ele.symbol.toUpperCase()}</div>
         <div class="col-2 py-4 text-end">$${ele.current_price}</div>
         <div class="col-3 py-4 text-end">$${marketCap(ele.total_volume)}</div>
         <div class="priceDiv">${priceChange(ele.price_change_percentage_24h)}%</div>
         <div class="col-3 py-4 text-end">Mkt Cap:- $${marketCap(ele.market_cap)}</div>
      </div>`
    function marketCap(num){ 
        let str = num.toString()
        str =   str.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        return str
    }
    function priceChange(num){
        if(num>0){
            let str = num.toString()
            str = str.slice(0,5)
            let int = parseFloat(str)
            return int
        }else if(num==0){
            let str = num.toString()
            let int = parseFloat(str) 
            return int
        }else{
            let str = num.toString()
            str = str.slice(1,5)
            str = "-"+str
            let int = parseFloat(str)
            return int
        }
    }
    })
    container.innerHTML = collection
    const priceDiv = document.querySelectorAll(".priceDiv")
    priceDiv.forEach((ele)=>{
        if(parseFloat(ele.textContent)>0){
            ele.setAttribute("class","price col-1 py-4 text-end")
        }else if(parseFloat(ele.textContent)<0){
            ele.setAttribute("class","price1 col-1 py-4 text-end")
        }
    })
}
searchInput.addEventListener("keyup", (event)=>{
    let value = event.target.value;
  if(value==""){
    getData(arr)
  }else{
   let arr1 = arr.filter((ele)=>{
     if(ele.name.toLowerCase()==value.toLowerCase() || ele.symbol.toLowerCase()==value.toLowerCase()){
        return ele
     }
    })
    getData(arr1)
  }
})


