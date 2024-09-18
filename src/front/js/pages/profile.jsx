import React from "react";
import "../../styles/profile.css";
import { UserInformation } from "../component/profile_details.jsx";
import imgperfil from "../../img/perfil/perfil-1.png";

export const Profile = () => {
  const Platforms_test = [
    { prefix: "fas", icon: "desktop", name: "PC" },
    { prefix: "fab", icon: "xbox", name: "Xbox" },
    { prefix: "fab", icon: "playstation", name: "PlayStation" },
  ];

  const Games_test = [
    {
      title: "League of Legends",
      image_url:
        "https://media.rawg.io/media/games/736/73619bd336c894d6941d926bfd563946.jpg	",
    },
    {
      title: "Fortnite",
      image_url:
        "https://media.rawg.io/media/games/d58/d588947d4286e7b5e0e12e1bea7d9844.jpg",
    },
  ];

  return (
    <section id="profile" className="bg-black">
      <div className="container" style={{ marginTop: "112px" }}>
        <section id="profile_background">
          <div
            className="container gradient-background-profile text-center"
            style={{ minHeight: "160px" }}
          ></div>
        </section>
        <section id="profile_user_information">
          <div className="container background-user-information">
            <UserInformation
              profile_img_url={imgperfil}
              username="@JuancitoMasNah"
              first_name="Juan"
              last_name="Perez"
              description="Juancito mas nah lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi."
              socialLinks={{
                youtube: "https://facebook.com/@JuancitoMasNahhhhhhhh",
                discord: "https://twitter.com/@JuancitoMasNahhhhhhhhh",
                twitch: "https://linkedin.com/in/@JuancitoMasNahhhhhh",
              }}
              platforms={Platforms_test}
              games={Games_test}
            />
          </div>
        </section>
      </div>
    </section>
  );
};
