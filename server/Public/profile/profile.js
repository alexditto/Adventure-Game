
const characterDisplay = document.getElementById("characterDisplay");
let arr = [];
function changeColorTest() {
  this.style.backgroundColor= "red";
  location.href = "/"
  console.log("working");
  return false;
}

fetch(`http://localhost:3000/api/character/` + window.location.href.split('/').reverse()[0])
      .then(res=> res.json())
      .then(data=> {
        for(n of data){
          let temp = [{"character" : n.character}, {"_id": n._id}, {"image": n.image}]
          arr.push(temp);
        };
        for (let i = 0; i<arr.length; i++) {
          if(i%3===0) {
            let br = document.createElement("br");
            characterDisplay.appendChild(br);
          }
          let temp = document.createElement('p');
          let node = document.createTextNode(arr[i][0].character);
          temp.setAttribute("id", `${arr[i][0].character}`);
          temp.classList.add("col-4");
          temp.appendChild(node);
          characterDisplay.appendChild(temp);

          //Character image
          let img = document.createElement("img");
          img.classList.add("col");
          img.src =  `${arr[i][2].image}`;
          temp.appendChild(img);

          //start icon
          let start = document.createElement("img");
          start.src = "start.png";
          start.classList.add("icon");
          img.classList.add("col");
          start.setAttribute("id", `${arr[i][1]._id}`)
          temp.appendChild(start);
          document.getElementById(`${arr[i][1]._id}`).addEventListener("click", function() {location.href = `/game/${arr[i][1]._id}`});

          //delete icon
          let deleteCharacter = document.createElement("img");
          deleteCharacter.src = "delete.png";
          deleteCharacter.classList.add("icon");
          img.classList.add("col");
          deleteCharacter.setAttribute("id", `d${arr[i][1]._id}`)
          temp.appendChild(deleteCharacter);
          // document.getElementById(`d${arr[i][1]._id}`).addEventListener("click", function(){location.href = `/api/delete/profile/${arr[i][1]._id}`});
          document.getElementById(`d${arr[i][1]._id}`).addEventListener("click", function(){
            let xhr = new XMLHttpRequest();
            xhr.open("DELETE", `/api/delete/character/${arr[i][1]._id}`, true)
            xhr.send()
            let x= document.getElementById(`${arr[i][0].character}`);
            let y= document.getElementById(`${arr[i][1]._id}`);
            let z= document.getElementById(`d${arr[i][1]._id}`);
            z.parentNode.removeChild(z);
            y.parentNode.removeChild(y);
            x.parentNode.removeChild(x);
          });
        }
      });
