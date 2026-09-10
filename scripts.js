let current_section = 0;
document.addEventListener("change", (e)=>{
  let url = document.getElementById("img_url").value;
  let img = document.getElementById("preview_image");
  img.style.display = "block";
  img.src = url;  
});
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname == '/getPass.html'){next()}
});

function viewPasses() {
  alert("here are ur passes");
}

let user_details = {
  ticket_id: crypto.randomUUID(),
  name: "",
  email: "",
  image_url: "",
  artist: [],
  food: [],
  games: [],
  payment: 0,
  food_cost: 0,
  artist_cost: 0,
  games_cost: 0,
};

function next() {
  document.querySelectorAll("section").forEach((section) => {
    section.style.display = "none";
  });
  
  current_section++;
  
  switch (current_section) {
    case 1:
      document.getElementById("details").style.display = "flex";
      break;
      case 2:
        document.getElementById("artist").style.display = "flex";
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let url = document.getElementById("img_url").value;

      console.log(name, email, url);
      user_details.name = name;
      user_details.image_url = url;
      user_details.email = email;
      break;
    case 3:
      document.getElementById("food").style.display = "flex";
      document
        .querySelectorAll("input[name=artists]:checked")
        .forEach((inp) => {
          user_details.artist_cost += Number(inp.dataset.price);

          document
            .querySelectorAll(`label[for="${inp.id}"]`)
            .forEach((artist) => {
              user_details.artist.push(artist.textContent);
            });
        });
      break;
    case 4:
      document.getElementById("games").style.display = "flex";
      document.querySelectorAll("input[name=food]:checked").forEach((inp) => {
        user_details.food_cost += Number(inp.dataset.price);
        document.querySelectorAll(`label[for="${inp.id}"]`).forEach((food) => {
          user_details.food.push(food.textContent);
        });
      });
      break;
    case 5:
      document.getElementById("review").style.display = "flex";
      document.querySelectorAll("input[name=games]:checked").forEach((inp) => {
        user_details.games_cost += Number(inp.dataset.price);
        document.querySelectorAll(`label[for="${inp.id}"]`).forEach((game) => {
          console.log(game.textContent);
          user_details.games.push(game.textContent);
        });
      });
      console.log(user_details);
      let name_r = document.getElementById("review_name");
      let email_R = document.getElementById("review_email");
      let food_r = document.getElementById("review_food");
      let activities_r = document.getElementById("review_activities");
      let artist_r = document.getElementById("review_artist");
      let payment_r = document.getElementById("review_payment");
      
      
      name_r.textContent = `Name: ${user_details.name}`;
      email_R.textContent = `Email: ${user_details.email}`;
      food_r.textContent = `Food Choosen: ${user_details.food.join(", ")}`;
      artist_r.textContent = `Artists Choosen: ${user_details.artist.join(", ")}`;
      activities_r.textContent = `Activities Choosen: ${user_details.games.join(", ")}`;
      user_details.payment =
      user_details.food_cost +
      user_details.artist_cost +
      user_details.games_cost;
      payment_r.textContent = `Total Payment: Rs ${user_details.payment}`;
      break;
      case 6:
        let payment_r_total = document.getElementById("review_payment_total");
        let payment_r_artist = document.getElementById("review_payment_artist");
        let payment_r_food = document.getElementById("review_payment_food");
        let payment_r_games = document.getElementById("review_payment_games");
        document.getElementById("payment").style.display = "flex";
        payment_r_total.textContent = `Total Payment: Rs ${user_details.payment}`;
        payment_r_artist.textContent = `Artist Cost: Rs ${user_details.artist_cost}`;
        payment_r_food.textContent = `Food Cost: Rs ${user_details.food_cost}`;
        payment_r_games.textContent = `Games Cost: Rs ${user_details.games_cost}`;
        break;
        
        case 7:
          localStorage.setItem(
            user_details.ticket_id,
            JSON.stringify(user_details),
          );

          viewPasses();
          break;
  }
}
