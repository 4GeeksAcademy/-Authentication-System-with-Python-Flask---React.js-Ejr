--
-- PostgreSQL database dump
--

-- Dumped from database version 12.6 (Ubuntu 12.6-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.6 (Ubuntu 12.6-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: unaccent; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS unaccent WITH SCHEMA public;


--
-- Name: EXTENSION unaccent; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION unaccent IS 'text search dictionary that removes accents';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: alembic_version; Type: TABLE; Schema: public; Owner: gitpod
--

CREATE TABLE public.alembic_version (
    version_num character varying(32) NOT NULL
);


ALTER TABLE public.alembic_version OWNER TO gitpod;

--
-- Name: mi_pasaporte; Type: TABLE; Schema: public; Owner: gitpod
--

CREATE TABLE public.mi_pasaporte (
    id integer NOT NULL,
    user_id integer,
    tipo_pymes character varying(100) NOT NULL,
    name character varying(250) NOT NULL
);


ALTER TABLE public.mi_pasaporte OWNER TO gitpod;

--
-- Name: mi_pasaporte_id_seq; Type: SEQUENCE; Schema: public; Owner: gitpod
--

CREATE SEQUENCE public.mi_pasaporte_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.mi_pasaporte_id_seq OWNER TO gitpod;

--
-- Name: mi_pasaporte_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gitpod
--

ALTER SEQUENCE public.mi_pasaporte_id_seq OWNED BY public.mi_pasaporte.id;


--
-- Name: pymes; Type: TABLE; Schema: public; Owner: gitpod
--

CREATE TABLE public.pymes (
    id integer NOT NULL,
    name character varying(250) NOT NULL,
    descripcion character varying(10485760),
    provincia character varying(300) NOT NULL,
    telefono character varying(300),
    email character varying(300),
    horario character varying(300),
    imagen character varying(1000) NOT NULL,
    logo character varying(1000),
    info_adicional character varying(10000),
    link_youtube character varying(600),
    sitio_web character varying(600),
    lat double precision NOT NULL,
    lon double precision NOT NULL,
    tipo character varying(100) NOT NULL,
    amenity character varying(100) NOT NULL,
    id_osm bigint NOT NULL
);


ALTER TABLE public.pymes OWNER TO gitpod;

--
-- Name: pymes_id_seq; Type: SEQUENCE; Schema: public; Owner: gitpod
--

CREATE SEQUENCE public.pymes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.pymes_id_seq OWNER TO gitpod;

--
-- Name: pymes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gitpod
--

ALTER SEQUENCE public.pymes_id_seq OWNED BY public.pymes.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: gitpod
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    email character varying(120) NOT NULL,
    password character varying(250) NOT NULL,
    nombre_completo character varying(120) NOT NULL,
    respuesta_de_seguridad character varying(120) NOT NULL
);


ALTER TABLE public."user" OWNER TO gitpod;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: gitpod
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO gitpod;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gitpod
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: mi_pasaporte id; Type: DEFAULT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.mi_pasaporte ALTER COLUMN id SET DEFAULT nextval('public.mi_pasaporte_id_seq'::regclass);


--
-- Name: pymes id; Type: DEFAULT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.pymes ALTER COLUMN id SET DEFAULT nextval('public.pymes_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: alembic_version; Type: TABLE DATA; Schema: public; Owner: gitpod
--

COPY public.alembic_version (version_num) FROM stdin;
cba85fab1bc7
\.


--
-- Data for Name: mi_pasaporte; Type: TABLE DATA; Schema: public; Owner: gitpod
--

COPY public.mi_pasaporte (id, user_id, tipo_pymes, name) FROM stdin;
\.


--
-- Data for Name: pymes; Type: TABLE DATA; Schema: public; Owner: gitpod
--

COPY public.pymes (id, name, descripcion, provincia, telefono, email, horario, imagen, logo, info_adicional, link_youtube, sitio_web, lat, lon, tipo, amenity, id_osm) FROM stdin;
1	Rancho Suizo Hotel	La búsqueda del hotel ideal en Nosara no tiene por qué ser complicada. Bienvenido a Hotel Rancho Suizo Lodge, una fantástica opción para viajeros como tú. Los huéspedes tienen acceso a espacio para guardar el equipaje durante su estancia en Hotel Rancho Suizo Lodge. Además, Hotel Rancho Suizo Lodge ofrece piscina y bar, lo que hará tu viaje a Nosara incluso más gratificante. Y otra ventaja es que hay aparcamiento disponible para los huéspedes. Los viajeros que quieran falafel pueden acudir a La Luna. Si no, puedes dirigirte a un pub como K-Rae's Black Sheep Pub, Edge Restaurant o La Casa Deli. Hotel Rancho Suizo Lodge está deseando darte la bienvenida cuando visites Nosara.	Guanacaste	2682 0975			https://media-cdn.tripadvisor.com/media/photo-s/02/c4/c1/6c/hotel-rancho-suizo-lodge.jpg				https://www.tripadvisor.es/Hotel_Review-g656474-d301319-Reviews-Hotel_Rancho_Suizo_Lodge-Nosara_Province_of_Guanacaste.html	9.9586786	-85.6736065	playa	hotel	278454119
2	Flor de la Sabana	el famoso restaurante Flor de la Sabana, la mejor comida de la zona	Puntarenas	2743 8557			https://fastly.4sqi.net/img/general/600x600/41367168_jkDv1bEg3TXD7rsSZPSRKay8jQI4G1TwcVt2pduCMlM.jpg				https://www.facebook.com/Restaurante-Flor-de-la-Sabana-238095959589960/	9.1466355	-83.3323932	playa	restaurant	355111844
3	Rincon de la Vieja Lodge	hotel en Guanacaste	Guanacaste	2200 0238			https://cf.bstatic.com/images/hotel/max1024x768/167/167011733.jpg				https://www.tripadvisor.es/Hotel_Review-g321538-d310463-Reviews-Rincon_De_La_Vieja_Lodge-Rincon_de_La_Vieja_Province_of_Guanacaste.html	10.7548152	-85.3510739	playa	hotel	278909068
4	Hotel Selva Verde Lodge	Selva Verde es más que un refugio y más que una reserva de selva tropical. Es su puerta de entrada a un mundo mágico de altísimos árboles de Almendro, Monos Aulladores y cara blanca y Tucanes. Sumérgete en la naturaleza tropical mientras caminas por un bosque verde profundo o reflexiona en silencio en una cómoda hamaca. Reaviva su sentido de la maravilla y descubre lo fuera de lo común. ¡Experimente a Selva Verde!	Limon	2761 1800	reservaciones@selvaverde.com		https://images.visitarcostarica.com/selva-verde-lodge-costa-rica.jpg	https://www.selvaverde.com/images/SVLTOPLOGO.png		https://youtu.be/BfgO6ZK46RY	https://www.selvaverde.com/es/	10.4504922	-84.0693872	playa	hotel	2267880638
5	Hotel Montana Linda	Montaña Linda Hotels, Spanish School and Group Programs. Montaña Linda is your first stop into Costa Rica's rich Orosi Valley. Here there's a slower pace of life - this is authentic Costa Rica.	Cartago	2533 3640	info@montanalinda.com		https://cf.bstatic.com/images/hotel/max1280x900/228/228275853.jpg	https://www.montanalinda.com/mlwp/wp-content/uploads/2013/02/logo-header.png			https://www.montanalinda.com/	9.7952653	-83.8566148	montaña	hotel	413066059
6	Orosi Lodge	Intimo pequeño hotel al estilo antiguo Colonial en el valle mas precioso de Costa Rica; ‘El Valle de Orosi’, Provincia de Cartago en la Meseta Central. El hotel se construyo al estilo antiguo colonial de Costa Rica.	Cartago	(506) 2533 3578	info@orosilodge.com		https://www.orosilodge.com/wp-content/uploads/2015/06/lodge_front21.jpg	https://www.orosilodge.com/wp-content/uploads/2015/06/logo-orosi-weiss1.png			http://www.orosilodge.com/es/	9.794113	-83.856121	montaña	hotel	832255135
7	Rio Perlas Spa & Resort	hotel en Cartago	Cartago	(+506) 2533-3341	info@rio-perlas.com		https://cf.bstatic.com/images/hotel/max1024x768/149/149278679.jpg	https://rio-perlas.com/images/jkit/items/15.jpg			https://rio-perlas.com/es/	9.7900839	-83.8509162	montaña	hotel	2267916597
8	B&b Los Angeles Lodge	Somos un Bed&Breakfast desde hace 27 años, nos encontramos al costado norte de la Basílica de Los Ángeles, contamos con 8 habitaciones todas incluyen su baño propio.	Cartago	8833 2136	lodgelosangeles@gmail.com		https://media-cdn.tripadvisor.com/media/photo-s/1c/55/7c/8d/los-angeles-lodge.jpg				https://www.facebook.com/BedBreakfast-Los-%C3%81ngeles-Lodge-101950345006737/	9.86479	-83.913698	montaña	hotel	3982520256
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: gitpod
--

COPY public."user" (id, email, password, nombre_completo, respuesta_de_seguridad) FROM stdin;
\.


--
-- Name: mi_pasaporte_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gitpod
--

SELECT pg_catalog.setval('public.mi_pasaporte_id_seq', 1, false);


--
-- Name: pymes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gitpod
--

SELECT pg_catalog.setval('public.pymes_id_seq', 8, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gitpod
--

SELECT pg_catalog.setval('public.user_id_seq', 1, false);


--
-- Name: alembic_version alembic_version_pkc; Type: CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.alembic_version
    ADD CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num);


--
-- Name: mi_pasaporte mi_pasaporte_pkey; Type: CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.mi_pasaporte
    ADD CONSTRAINT mi_pasaporte_pkey PRIMARY KEY (id);


--
-- Name: pymes pymes_name_key; Type: CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.pymes
    ADD CONSTRAINT pymes_name_key UNIQUE (name);


--
-- Name: pymes pymes_pkey; Type: CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.pymes
    ADD CONSTRAINT pymes_pkey PRIMARY KEY (id);


--
-- Name: user user_email_key; Type: CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_email_key UNIQUE (email);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: mi_pasaporte mi_pasaporte_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.mi_pasaporte
    ADD CONSTRAINT mi_pasaporte_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- PostgreSQL database dump complete
--

