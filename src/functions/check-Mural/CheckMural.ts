export async function getData(idGroup:string){
    const response = await fetch("http://localhost:8000/murals/" + idGroup, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
    const Data = await response.json()
    return Data
}  