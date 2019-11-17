
const characterDisplay = document.getElementById("characterDisplay");
let arr = [];
function changeColorTest() {
  this.style.backgroundColor= "red";
  location.href = "/"
  console.log("working");
  return false;
}

fetch(`http://localhost:3000/api/character/` + window.location.href.slice(30))
      .then(res=> res.json())
      .then(data=> {
        for(n of data){
          let temp = [{"character" : n.character}, {"_id": n._id}]
          arr.push(temp);
        };
        for (let i = 0; i<arr.length; i++) {
          let temp = document.createElement('p');
          let node = document.createTextNode(arr[i][0].character);
          temp.setAttribute("id", `${arr[i][0].character}`)
          temp.appendChild(node);
          characterDisplay.appendChild(temp);

          //start icon
          let start = document.createElement("img");
          start.src = "start.png";
          start.classList.add("icon");
          start.setAttribute("id", `${arr[i][1]._id}`)
          characterDisplay.appendChild(start);
          document.getElementById(`${arr[i][1]._id}`).addEventListener("click", function() {location.href = `/game/${arr[i][1]._id}`});

          //delete icon
          let deleteCharacter = document.createElement("img");
          deleteCharacter.src = "delete.png";
          deleteCharacter.classList.add("icon");
          deleteCharacter.setAttribute("id", `d${arr[i][1]._id}`)
          characterDisplay.appendChild(deleteCharacter);
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
