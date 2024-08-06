import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
<section
  className="overflow-hidden bg-[url(https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=2670&auto=format&fit=crop)] bg-cover bg-top bg-no-repeat"
>
  <div className="bg-black/50 p-8 md:p-12 lg:px-16 lg:py-24">
    <div className="ltr:sm:text-left rtl:sm:text-right">
      <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-5xl">Latest Shirts</h2>

      <p className="hidden max-w-lg text-white/90 md:mt-6 md:block md:text-lg md:leading-relaxed">
        asdasdasadsa
      </p>

      <div className="mt-4 sm:mt-8">
        <a
          href="#"
          className="inline-block rounded-full bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400"
        >
          Get Yours Today
        </a>
      </div>
    </div>
  </div>
</section>
	);
};
