import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import BackButton from "../component/backButton.js";

export const Exercises = () => {
    const { store, actions } = useContext(Context);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [addedExercises, setAddedExercises] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        actions.allExercise();
        actions.category();
    }, []);

    const skeletonCount = 12;

    const filteredExercises = store.allExerciseList.filter((item) => {
        const matchesCategory = selectedCategory === "" || item.category === selectedCategory;
        const matchesSearchTerm = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearchTerm;
    });

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    const handleAddExercises = (id, name) => {
        setAddedExercises((prev) => prev.filter(exercise => exercise.id !== id));
    };

    return (
        <>
            <div className="flex flex-row flex-wrap gap-2 w-[80vw] max-w-[1600px] items-end justify-end mb-5 m-auto relative">
                <div className="absolute left-0 -top-[6px]">
                    <BackButton />
                </div>

                {/* search input */}
                <div className="relative">
                    <label htmlFor="Search" className="sr-only"> Search for... </label>
                    <input
                        type="text"
                        id="Search"
                        placeholder="buscar ejercicios..."
                        className="border-none max-w-40 h-8 rounded-md px-4 py-2 pe-10 shadow-sm sm:text-sm dark:bg-neutral-900 dark:text-white focus:ring-emerald-500 focus:border-emerald-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                        <span className="text-neutral-600 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300">
                            <span className="sr-only">Search</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                />
                            </svg>
                        </span>
                    </span>
                </div>

                {/* filtrar */}
                <div>
                    <select
                        name="HeadlineAct"
                        id="HeadlineAct"
                        className="bg-neutral-900 border-none text-neutral-300 text-sm/none font-medium ms-2 md:me-2 px-4 py-2 h-8 rounded-md focus:ring-transparent focus:border-transparent"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option className="flex items-center border-e px-4 py-2 text-sm/none font-medium text-neutral-600 dark:border-e-neutral-800 dark:text-neutral-300" value="">
                            Filtrar
                        </option>
                        {store.allCategoryList.map((item, index) => (
                            <option key={index} className="lowercase px-4 py-2" value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>

            </div>

            {/* Renderiza la lista de ejercicios filtrados */}
            <div className='min-h-[50vh] w-[80vw] max-w-[1600px] mx-auto'>
                <div className="grid grid-cols-1 gap-4 w-full mx-auto p-2 max-w-[1920px]" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}> {/* Grid adaptable */}

                    {filteredExercises.length === 0 ? (
                        <>
                            {Array.from({ length: skeletonCount }).map((_, index) => (
                                <article key={index} className="w-full h-60 flex flex-col bg-white transition-all shadow-xl dark:bg-neutral-900 border border-neutral-700 rounded-md overflow-hidden ">
                                    <div className="block sm:basis-36 h-1/2 overflow-hidden">
                                        <div className="aspect-square h-full w-full bg-neutral-700 animate-pulse"></div>
                                    </div>
                                    <div className="p-3 flex flex-1 flex-col gap-4 justify-between h-1/2">
                                        <div className="flex flex-col gap-3 border-neutral-700 relative">
                                            <div className="h-6 bg-neutral-700 rounded-full animate-pulse w-3/4"></div>
                                            <div className="h-4 bg-neutral-700 rounded-full animate-pulse w-1/4"></div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </>
                    ) : (
                        filteredExercises.map((item, index) => (
                            <Link
                                key={item.id}
                                to={`/exercises/${item.id}`}
                            >
                                <article
                                    className="w-full h-60 flex flex-col bg-white transition-all shadow-xl dark:bg-neutral-900 border border-neutral-700 rounded-md overflow-hidden group"
                                >
                                    <div className="block sm:basis-36 h-1/2 overflow-hidden">
                                        <img
                                            alt=""
                                            src={
                                                item.image
                                                    ? item.image
                                                    : "https://placehold.jp/303031/878787/384x384.png?text=No%20disponible"
                                            }
                                            className={`${item.image ? 'object-scale-down p-2' : ''} aspect-square h-full w-full object-cover bg-white transition-transform duration-300 group-hover:scale-110`} />
                                    </div>
                                    <div className="p-3 flex flex-1 flex-col gap-4 justify-between h-1/2">
                                        <div className="flex flex-col gap-3 dark:border-white/10 relative">
                                            <h3 className="font-bold text-neutral-900 dark:text-white">
                                                {item.name}
                                            </h3>
                                            <span className="rounded-full bg-neutral-800 px-2 w-fit py-1 text-xs font-medium lowercase text-neutral-400 text-center">
                                                {item.category}
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        )))}
                </div>
            </div>
        </>);
};