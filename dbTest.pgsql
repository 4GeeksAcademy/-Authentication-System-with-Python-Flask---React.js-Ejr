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
    name character varying(600) NOT NULL,
    descripcion character varying(10485760),
    provincia character varying(600) NOT NULL,
    telefono character varying(600),
    email character varying(600),
    horario character varying(1000),
    imagen character varying(1000) NOT NULL,
    logo character varying(1000),
    info_adicional character varying(10485760),
    link_youtube character varying(1000),
    sitio_web character varying(1000),
    tipo character varying(1000) NOT NULL,
    categoria character varying(1000) NOT NULL,
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
6f692dc05dd0
\.


--
-- Data for Name: mi_pasaporte; Type: TABLE DATA; Schema: public; Owner: gitpod
--

COPY public.mi_pasaporte (id, user_id, tipo_pymes, name) FROM stdin;
\.


--
-- Data for Name: pymes; Type: TABLE DATA; Schema: public; Owner: gitpod
--

COPY public.pymes (id, name, descripcion, provincia, telefono, email, horario, imagen, logo, info_adicional, link_youtube, sitio_web, tipo, categoria, id_osm) FROM stdin;
1	El castillo	Cuando la tierra de El Castillo fue comprada hace 14 años, era una de las propiedades más buscadas en el Pacífico Sur de Costa Rica, la última frontera de tierras vírgenes.  El hotel de lujo fue construido como una fortaleza para soportar la prueba del tiempo, tardando un año completo en completar la construcción. Es un icono en la zona, especialmente para extranjeros locales de todo el mundo y costarricenses nativos que aprecian sus impresionantes vistas.  El Castillo, es el cielo en la tierra con nueve habitaciones decoradas con buen gusto y una relación personal-habitación de uno a uno. Se encuentra en Ojochal, un pueblo en el extremo sur de Costa Ballena, en la región central del Pacífico Sur de Costa Rica. Hay una razón por la que nuestro hotel de lujo solo para adultos de nueve habitaciones se llama El Castillo: La magnífica estructura encaramada a 600 pies sobre el Océano Pacífico tiene posiblemente la vista más hermosa de toda Costa Rica. Nuestro excepcional personal se asegurará de que sus vacaciones sean las mejores de su vida.  No hay rascacielos, centros comerciales o congestión de tráfico en Ojochal. En su lugar, el área tiene aire limpio de montaña, olas oceánicas de clase mundial, y cientos de millas cuadradas de diversa selva. Es la base perfecta para experimentar casi cualquier aventura y algunos de los mejores restaurantes de Costa Rica.  Para completar su experiencia en El Castillo, tenemos Castillo’s Kitchen. El chef Diego le sorprenderá con sus creaciones diarias y una experiencia de mesa de chef que domina la evolución de la cocina costarricense.	Puntarenas	(+506) 2786 5543	info@elcastillocr.com	De 5:30am a 9:00pm	https://www.elcastillocr.com/wp-content/uploads/2020/10/StayDinePlay1-1536x1024.jpg	https://www.elcastillocr.com/wp-content/uploads/2019/04/El-Castillo-logo-RGB-horiz-white-420x84-b.png	Hay una razón por la que nuestro hotel de lujo de nueve habitaciones solo para adultos se llama El Castillo: la magnífica estructura ubicada a 600 pies sobre el Océano Pacífico tiene posiblemente la vista más espectacular de toda Costa Rica.   Espectacular, sí. Congestionado, no. Nuestro excepcional personal se asegurará de que sus vacaciones sean las mejores de su vida. Cene en el restaurante de El Castillo, Castillo’s Kitchen, un concepto de Chef’s Table que domina la evolución de la cocina costarricense. Experimente elementos de Costa Rica en cada plato de una manera nueva e innovadora.  Bienvenido a la jungla y alrededor del tres por ciento de la biodiversidad de este lado del planeta. Si prefiere la vida silvestre a la vida nocturna, este es el lugar para usted. Observación de ballenas, snorkel, caminatas, pesca en alta mar, tirolesa, surf, kayak, peinar la playa y observación de tortugas marinas se encuentran a minutos de El Castillo.	https://www.youtube.com/embed/hMuX8RSIgTc?rel=0	https://www.elcastillocr.com/about/hotel/	montaña	Hotel	2832329445
2	Maquenque Eco Lodge	Nuestro hotel es el lugar ideal para los amantes de la naturaleza,Estamos estratégicamente ubicados dentro del Refugio Nacional de Vida Silvestre Maquenque, bordeando el río San Carlos, contamos con 15 cabañas y 4 casas del árbol de aproximadamente 45 m2, equipados con,agua caliente (a través de paneles solares), baño privado, ventilador de techo, ropero abierto, balcón con una hermosa vista a una laguna natural o al bosque para las casas del árbol, donde puedes relajarte en una hamaca mientras lees un libro o simplemente disfruta de la belleza de la naturaleza circundante.  Contamos con 68 acres de selva tropical, dentro de la cual tenemos senderos para que usted pueda disfrutar solo o con uno de nuestros guías. Hay una gran variedad de flora y fauna, haciendo de este el lugar perfecto para los amantes de las aves. Actualmente, hemos identificado más de 592 especies de aves, incluyendo el guacamayo verde (Ara ambiguus) y el guacamayo escarlata (Ara Macao).  Misión,Ser una empresa que brinde servicios de hospedaje  de alta calidad, en un entorno natural y en armonía con la naturaleza para satisfacer las necesidades de nuestros clientes internacionales y locales, siempre comprometidos con la proyección social y la promoción de la sostenibilidad ambiental. Visión,Ser una empresa líder en proveer servicio de alojamiento, para satisfacer las necesidades de nuestros clientes externos y, al mismo tiempo, ser conocidos en el mercado del turismo como el modelo que impulsa el bienestar social y la sostenibilidad ambiental.	Alajuela	(+506) 2479-8200	info@maquenqueecolodge.com	De 5:30am a 9:00pm	http://cdn.precioyviajes.com/00/14/99/00149965_gp.jpg	https://maquenqueecolodge.com/wp-content/uploads/2016/09/logo-maquenque-transparente-con-borde-blanco.png	¡Visite nuestra gran huerta de frutas y verduras! Orgullosamente le presentamos nuestra propia  jardín verde  y huerta, donde producimos el 70% de lo Maquenque Eco Lodge utiliza.   Nuestros jardineros cultivan nuestras verduras y frutas con los altos estándares de calidad  de la mano de la sostenibilidad, Verduras y frutas como: plátanos, limones, mandarinas, papaya, la albahaca, carambola,  cilantro, chile, palmito, plátano, tomate, yuca y muchas otras clases son partes de nuestros más apetecibles resultados.	https://www.youtube.com/embed/sINUJ4hvJSE?rel=0	https://www.facebook.com/Maquenque/	montaña	Hotel	3982525327
3	El establo mountain hotel	Disfrute del bosque por la noche unase a nosotros, sea ​​testigo de una magnífica puesta del sol y prepárese para la exuberante vida nocturna en el bosque.   Elija una actividad diferente y emocionante para hacer durante la noche, entrar en contacto con la naturaleza y estar preparado para interactuar con la biodiversidad del bosque nuboso, deje que nuestros guías profesionales lo instruyan sobre los misterios y curiosidades de la selva tropical después del anochecer.	Puntarenas	(+506) 2645-5110	info@elestablo.com	24 Horas	https://elestablo.com/wp-content/uploads/2019/11/night1.jpg	https://elestablo.com/wp-content/uploads/2019/10/Hotel-El-Establo-black.png	Canopy Tour se caracteriza por ser diferente. ¿Por qué? Porque es facil, se realiza dentro del establecimiento del Hotel El Establo lo que nos permite ofrecer a nuestros clientes horarios flexibles, Esto significa que los clientes pueden elegir prácticamente cuando deseen realizar el tour, Canopy Tour está especialmente diseñado para disfrutar de la espectacular vista del Golfo, la flora y la fauna.	https://www.youtube.com/embed/g33WbX2t7WQ?rel=0	https://elestablo.com/	montaña	Hotel	1392854165
4	Kinkara	UN INMERSIVO COSTA RICA RESORT EN EL QUE COMIENZAN LAS AVENTURAS Escondido al pie del monte. Chirripó, en la Biodiversa Zona Sur de Costa Rica, Kinkara es un complejo de lujo experiencial para actividades únicas, relajación personal y aventuras colectivas en grupo. Ya sea nadando en una cascada en la jungla, saboreando una exquisita cocina de la granja a la mesa o encontrando paz interior a través del yoga, Kinkara Luxury Retreat ofrece momentos de autodescubrimiento, un camino hacia ideas renovadas y conexiones increíbles con la naturaleza.	San José	(+506) 4040-0423 	reservations@kinkara.com	24 Horas	https://quebuenlugar.com/wp-content/uploads/2019/11/kinkaraQBL-34.jpg	https://www.kinkara.com/images/kinkara-santa-elena-costa-rica-logo.svg	Sumérgete en Costa Rica Aventura y relajación en nuestro retiro de lujo Un lugar para sumergirse en experiencias auténticas diseñadas para rejuvenecer el cuerpo, la mente y el alma, no hay ningún lugar como Kinkara Luxury Retreat. Sumérjase en los milagros de la naturaleza mientras explora nuestro retiro y más allá. Aproveche la antigua sabiduría en su búsqueda de la curación. Sueña más profundamente en nuestras tiendas de lujo y saborea los regalos de la tierra a través de nuestra elevada cocina de tierra a plato. Como descubrirá en Kinkara Luxury Retreat, el nuevo camino es antiguo.   Acomodaciones Experimentales Duerma bajo las estrellas y despiértese con la luz del sol y los sonidos de la naturaleza en nuestras carpas privadas Lotus Belle premium. Disfrutará de comodidades de lujo cuidadosamente diseñadas y un sueño verdaderamente reparador cerca de la Madre Naturaleza. Cocina Epicúrea De La Tierra Al Plato Celebre la abundancia de la tierra en toda su gloria colorida y curativa. Nuestra cocina elaborada con delicadeza combina ingredientes orgánicos de cosecha propia con productos locales de origen sostenible para obtener deliciosas y nutritivas comidas de tierra a plato que apoyan la regeneración y la renovación personal. Espacios Extraordinarios Con una serie de espacios lúdicos ubicados dentro de vastos paisajes naturales, nuestro refugio de lujo es deliciosamente poco convencional. Ya sea que visite un retiro, viaje personal o participe en un evento grupal, los espacios para experimentar, aprender, conectarse y relajarse son variados y muchos.	https://www.youtube.com/embed/aiA3FDrZlkc?rel=0	https://www.kinkara.com/es/	montaña	Hotel	355111844
5	Villa Calas	Es un negocio familiar de origen costarricense en donde por más de veinte años muchas personas han disfrutado de un merecido descanso en un entorno con las características típicas del bosque nuboso, pero de fácil acceso y muy cerca del Valle Central, tenemos una ubicación especial para todos aquellos visitantes que desean conocer lugares icónicos, como el majestuoso Volcán Poás o la mística Catarata de la Paz, asimismo, contamos con un acogedor restaurante con una propuesta gastronómica que fusiona la maravillosa comida tradicional de Costa Rica con exquisitas opciones internacionales y un conjunto de cabañas adaptadas al paisaje para brindarles una experiencia campestre.	Alajuela	(+506) 2482 2222	info@villacalas.com	De 7:00am a 8:00pm	https://www.villacalas.com/images/new/051.jpg	https://www.villacalas.com/images/logo.png	En un ambiente relajado, y con un estilo único, nuestro restaurante ofrece una experiencia culinaria de alto nivel, con la deliciosa comida costarricense como base, haciendo una fusión con extraordinarios platos internacionales. Nuestra comida es preparada con ingredientes frescos, de origen local y de la más alta calidad Se encuentra abierto para nuestros huéspedes y público de 7:00am a 8:00pm, todos los días. ** Podrían presentarse variaciones en el horario; se recomienda previa consulta **"    	https://www.youtube.com/embed/vrOHs1XKuIk?rel=0	https://www.villacalas.com	montaña	Hotel	3982522204
6	Rio Perlas Spa & Resort	Ubicado en la frontera de Cartago y en la intersección lateral Río Perlas y Rio Navarro, se conoce como uno de los bosques tropicales más hermosos y hoteles de montaña en todo Costa Rica , rodeado por una abundancia de Naturaleza, tranquilidad, vida silvestre y selva.	Cartago	(+506) 2533-3341	info@rio-perlas.com	24 Horas	https://cf.bstatic.com/images/hotel/max1024x768/149/149278679.jpg	https://rio-perlas.com/images/jkit/items/15.jpg	se realizan actividades especiales acorde a la situacion,Cuentan con paquetes diseñados para lo que necesitas y un salón con capacidad para 100 personas	https://www.youtube.com/embed/K_-QGA1R5Dw?rel=0	https://rio-perlas.com/es/	montaña	Hotel	2267916597
7	Orosi Lodge	Íntimo pequeño hotel al estilo antiguo Colonial en el valle más precioso de Costa Rica; ‘El Valle de Orosi’, Provincia de Cartago en la Meseta Central. El hotel se construyó al estilo antiguo colonial de Costa Rica.	Cartago	(+506) 2533 3578	info@orosilodge.com	7am a 7pm	https://www.orosilodge.com/wp-content/uploads/2015/06/lodge_front21.jpg	https://www.orosilodge.com/wp-content/uploads/2015/06/logo-orosi-weiss1.png	Pequeño Hotel Boutique de estilo Colonial en el valle más hermoso de Costa Rica: "Valle de Orosi", solo 40 minutos de San José, se realizan promociones constantemente	https://www.youtube.com/embed/UDv6QqeXWKY?rel=0	http://www.orosilodge.com/es/	montaña	Hotel	832255135
8	Hotel Montaña Linda	Hotel de Montaña Linda, tiene una escuela de Español y Programas para Grupos.   Montaña Linda es su primera parada en el rico Valle de Orosi de Costa Rica, aquí hay un ritmo de vida más lento: esta es la auténtica Costa Rica.	Cartago	(+506) 2533 3640	info@montanalinda.com	02pm a 12pm	https://cf.bstatic.com/images/hotel/max1280x900/228/228275853.jpg	https://www.montanalinda.com/mlwp/wp-content/uploads/2013/02/logo-header.png	El Montaña Linda Hostel Orosi se encuentra en Orosí, a 29 km de San José y a 47 km de Alajuela. Hay conexión WiFi gratuita. Cuenta con jardín y salón compartido.  Algunos alojamientos tienen zona de estar.  El establecimiento alberga una cocina compartida.  También se ofrece información turística. La zona es ideal para practicar senderismo.	https://www.youtube.com/embed/mZmuLTRSlNo?rel=0	https://www.montanalinda.com/	montaña	Hotel	3982524277
9	Playa Negra	Vengan a disfrutar de la hospitalidad y de la tranquilidad de nuestro hotel de playa justo en frente de la ola de Playa Negra, famosa en el mundo entero.  Lejos de las rutas más frecuentadas, ustedes se encontraran rodeados de naturaleza pura, a lado de las playas más hermosas de la costa pacífica norte de Guanacaste, Costa Rica. La brisa del mar combinada con el sonido de las olas les dará una sensación de paz y de relajación mientras disfrutan de nuestro restaurante y de nuestra piscina, en frente a la playa. Nuestros 17 bungalows y suite bungalows, están en medio de jardines tropicales, a pocos pasos de las cálidas y claras aguas tropicales del océano Pacífico.	Guanacaste	(+506) 7193 5845	hotelplayanegra@ice.co.cr	De 5:30am a 9:00pm	https://media-cdn.tripadvisor.com/media/photo-s/02/be/b8/c2/hotel-playa-negra.jpg	https://playanegra.com/wp-content/uploads/2017/05/logo-color.gif	Surf La ola de Playa Negra, famosa en todo el mundo, se encuentra justo en frente del hotel y a unos pasos al sur esta una bella playa de arena, donde principiantes pueden practicar el surf.  Yoga Las sesiones de yoga se desarrollan en nuestro Shala en frente al océano, donde el sonido de las olas y la brisa del mar crean el ambiente perfecto para su experiencia de yoga.  Cabalgatas Disfrute maravillosas cabalgatas en la playa o en los senderos del campo con nuestros caballos criollos bien entrenados por nuestro guía Elvis.	https://www.youtube.com/embed/D72MOsbBTRs?rel=0	https://playanegra.com/es/inicio/	playa	Hotel	479116054
10	Hotel Villas Arenas	Bienvenidos a Playa Hermosa  Dicho paraje es reconocido a nivel mundial como la capital del buceo. La riqueza marina del Golfo de Papagayo, embellece las aguas cristalinas que bañan este paradisíaco lugar, unido a las majestuosas puestas de sol que realzan lo imponente de este entorno natural.	Guanacaste	(+506) 8362 - 7918	avallejos@hotelvillasarenas.com	24 Horas	https://cf.bstatic.com/images/hotel/max1024x768/150/150695077.jpg	http://3.bp.blogspot.com/-MDVyFNZRAzQ/XENKemgHhHI/AAAAAAAAIe0/0p2U60v5Eyw3ZvNp-_UqsuT4lDcR0EyaQCK4BGAYYCw/s1600/Logo.png	El hotel dispone de 8 confortables y espaciosas habitaciones completamente equipadas, Internet inalámbrico y piscina con un relajante jacuzzi para el goce de su estadía . Disfrute de múltiples atracciones en un ambiente tranquilo rodeado de hermosa vegetación y fauna silvestre.	https://www.youtube.com/embed/-KxrE7LbNh4?rel=0	http://www.hotelvillasarenas.com/	playa	Hotel	355111844
11	Hotel playa bonita	El Hotel está estratégicamente ubicado a 2.5 kilómetros de la Ciudad de Limón, en donde usted puede visitar lugares con gran valor histórico como el Parque Central, el Muelle y la Primera Iglesia Baptista de Limón.   También, estamos ubicados a 2 kilómetros de Puerto Moín, lugar de inicio de los impresionantes Canales de Tortuguero, famosos por el anidado de Tortugas y su diversidad de fauna como aves, monos y cocodrilos.   Se presta para la pesca y quizás, si tiene suerte, puede atrapar Macarelas en la desembocadura del río con el Mar Caribe. Si disfruta del surf, justo frente al hotel, tiene 2 puntos para conquistar las olas de la región Atlántica. Organizamos eventos especiales (Reuniones empresariales, Matrimonios, Baby Shower, Primera Comunión, etc).",	Limon	(+506) 2795 1010	info@hotelplayabonita.com	24 Horas	https://media-cdn.tripadvisor.com/media/photo-s/03/23/f6/a4/hotel-playa-bonita.jpg	https://media-cdn.tripadvisor.com/media/photo-s/03/48/45/2d/hotel-playa-bonita.jpg	SERVICIOS DEL HOTEL: 52 Habitaciones, Check in 2pm - Check out 12pm, Desayuno Incluido, Aire acondicionado,Televisión por cable,Baño privado, Caja de seguridad, Piscina con vista al mar ,Bar y Restaurante, Internet inalámbrico, Deck, Mesa de Pool, Parqueo con vigilancia, Servicio de lavandería, Eventos especiales",	https://www.youtube.com/embed/hMKE511dgUo?rel=0	https://www.hotelplayabonita.com/	playa	Hotel	3982524316
12	Tamarindo Diria	HOTEL TAMARINDO DIRIÁ COSTA RICA    El hotel Tamarindo Diriá es un hotel en Tamarindo Guanacaste, cuenta con tres áreas: family poolview, sunset oceanview y tropicana adults only.  Contamos con tres tipos de temáticas de habitaciones diferentes: area sunset, área tropicana y area familiar.  contamos también con varias áreas de piscinas para todos los gustos!! 	Guanacaste	(+506) 4032 0032	contactus@tamarindodiria.com	24 Horas	https://www.tamarindodiria.com/images/disallow/tamarindo-diria-021.jpg	https://www.tamarindodiria.com/images/TamarindoDiria.png	En el Tamarindo Diriá todas y cada una de nuestras 242 habitaciones, divididas en cuatro categorías, han sido diseñados para el confort y disfrute de nuestros huéspedes, todas las habitaciones disponen de puertas con cierres electrónicos, cajas de seguridad, televisión plana por cable (noticias internacionales, deportes y películas), aire acondicionado, cafetera de capsulas, minibar, servicio de llamadas (internacional y nacional), camas de tamaño King (o dos matrimoniales) y conexión a internet (WiFi gratis), disfrute de nuestras habitaciones con vistas despejadas al Océano Pacífico a unos pasos de la playa, desde la terraza de su habitación, los huéspedes pueden descansar de un día inolvidable mientras disfrutan de los coloridos atardeceres que ofrece el Oceáno Pacífico.Habitaciones Sunset Oceanview Amuebladas con elegancia y gusto, es el alojamiento perfecto para familias y parejas que buscan un ambiente sereno y relajado con vista a la playa de arena blanca fácil de aprovechar en sus amplios balcones o hermosas terrazas.	https://www.youtube.com/embed/aU1HUQOQOto?rel=0	https://www.tamarindodiria.com/es/	playa	Hotel	128156706
13	Hotel Pasatiempo	El Hotel Pasatiempo es el perfecto hotel boutique ubicado en Playa Tamarindo. Un sendero le lleva del área de recepción a nuestra piscina tropical y al restaurante. Los caminos de piedra o madera, salpicados de exuberante vegetación, palmeras y mangos, serpentean hacia los diversos bungalows, cada uno con su propio patio sombreado con sillones y/o hamacas.  Ofrecemos precios más que justos, y si está buscando un lugar íntimo, con abundantes jardines verdes que rodeen la piscina, somos la elección perfecta. Estamos ubicados a solo 400 yardas de la playa en Playa Tamarindo, la joya de Guanacaste, Costa Rica.  Estamos ubicados en una zona tranquila de la ciudad, a solo 5 minutos a pie de la playa. Su habitación estará rodeada de naturaleza, pero a poca distancia de todo en la ciudad. Relájese en la piscina, disfrute de un cóctel o una buena comida fresca en nuestro bar/restaurante Monkey La-La o reserve una actividad durante su estadía. Las habitaciones cuentan con A/C de alta eficiencia, televisores de pantalla plana con cable, colchones ortopédicos con almohadónes, baño privado con ducha y agua caliente, caja de seguridad, refrigerador y una pequeña terraza privada frente a su habitación.  No olvide nuestras noches de música en vivo todos los miércoles y sábados de 7:30 p.m. a 9:30 p.m.	Guanacaste	(+506) 2653 0096 / (+506) 2653 4701	reservas@hotelpasatiempo.com	De 7:30am a 9:00pm	https://media-cdn.tripadvisor.com/media/photo-s/0f/52/d4/38/hotel-pasatiempo.jpg	http://www.hotelpasatiempo.com/imgs/pasatiempo-logo.png	El Hotel Pasatiempo, a 4 minutos a pie de la playa de Tamarindo, cuenta con una piscina al aire libre, exuberantes jardines tropicales y habitaciones con aire acondicionado y baño privado.  Todas las hermosas habitaciones del Hotel Pasatiempo tienen una decoración luminosa, camas ortopédicas y televisores de pantalla plana con canales por cable. Los baños privados cuentan con azulejos coloridos, agua caliente y artículos de tocador orgánicos.  Tours, servicios de traslados y conserjería están disponibles en el mismo hotel. Se pueden organizar traslados al aeropuerto para llevarlo a los aeropuertos de Tamarindo, Liberia y San José por una tarifa.  Se ofrece un delicioso desayuno con varias opciones increíbles, que se sirve a diario en el amplio restaurante al aire libre de Pasatiempo. Que se encuentra en una cabaña de estilo palapa. El bar de la piscina Monkey La-La sirve comida local fresca, cerveza y cócteles exóticos. La música en vivo se realiza dos veces por semana en el restaurante, esta es una experiencia de micrófono abierto, traiga su voz o cualquier instrumento para entretener a los huéspedes del hotel y a los locales.  El amable personal puede organizar actividades tales como: safaris en barco, snorkel, excursiones de pesca, excursiones en catamarán, aventuras en cuadraciclos, así como excursiones de observación de ballenas o tortugas. El famoso Parque Nacional Las Baulas está a menos de 2 kms del hotel. Para los verdaderos aventureros, el recorrido por Río Celeste es una pintoresca experiencia de senderismo escénico.  Nuestros clientes dicen que esta parte de Tamarindo es su favorita, según sus propios comentarios.	https://www.youtube.com/embed/0Jnzq7283j4?rel=0	https://www.hotelpasatiempo.com/es/	playa	Hotel	3982524305
14	Hotel La botella de leche	BIENVENIDOS A LA BOTELLA DE LECHE HOSTEL El Mejor Lugar para Disfrutar Haga nuevos amigos, Relajése, Disfrute y Comparta Experiencias  Concerjeria Excursiones, Traslados, Restaurantes, Autos de Alquiler, Playas, Buses Públicos. Déjenos ayudarlo a que tenga una estadía libre de problemas en Tamarindo Instalaciones Piscina, Cocina Abierta, Wi-Fi, Estacionamiento, Seguridad, Café gratuito 24hs, Conserjería, Juegos de Mesa, Video Juegos, TV, Hamacas, Libros. Buceo Los instructores de buceo profesional en Be Water Dive Center serán sus expertos guias que lo llevaran a nuestro parque nacional marino donde podrán observarla fauna marítima local y visitar varios puntos de buceo diferentes ubicados alrededor de las Islas Catalinas.	Guanacaste	(+506) 2653 0189	info@botelladeleche.com	24 Horas	https://cf.bstatic.com/images/hotel/max500/120/120422636.jpg	http://www.labotelladeleche.com/images/logo2.png	Excursiones  LECCIONES SURF / ALQUILER TABLAS Clases de Grupo o privadas, incluyen la camisa y la tabla.  BUCEO Los instructores de buceo profesional en Be Water Dive Center serán sus expertos guias que lo llevaran a nuestro parque nacional marino donde podrán observarla fauna marítima local y visitar varios puntos de buceo diferentes ubicados alrededor de las Islas Catalinas. ESNÓRQUEL En esta experiencia podrás sentir la verdadera vida animal bajo el agua, te llevamos a una de las mejores palayas de Guanacaste, donde además de ver un paisaje increible fuera del agua, te invitamos a que descubras el mundo debajo de ella. El tour incluye, Traslado, hacia las playas. TIROLESA Descuba la belleza del paisaje de Guanacaste mediante una tirolesa. Con 11 líneas diferentes y un puente de balanceo, será sin duda una experiencia para recordar. La más larga de las 11 líneas es de 1.850 pies de largo y a más de 400 pies de la tierra! KAYAK POR LOS MANGLARES Reme por el manglar observando aves, cocodrilos y camine para ver varios monos. Descubre los grandes árboles y sientala naturaleza tica.	https://www.youtube.com/embed/h5J_3QzhEmQ?rel=0	http://www.labotelladeleche.com/#/	playa	Hotel	3982523602
15	Hotel Bosque del mar	Nuestra familia de empresas inició abriendo Tilajari Hotel Resort en 1989, más adelante en el 2003 compramos una propiedad única frente al mar en Guanacaste, llamada Cabinas Playa Hermosa. Ese legendario sitio de hospedaje, fue el primero en su tipo en Playa Hermosa durante los años sesentas.  Las antiguas cabinas fueron populares debido a su excelente ubicación justo en frente de una playa tan limpia y bella, en su momento, también se caracterizaba por un buen restaurante y espléndidos jardines tropicales con árboles enormes que aún se mantienen. Una vez que el Grupo Tilajari compró la propiedad, inició la transformación para aumentar su categoría de cabinas a Hotel, convirtiéndose en Hotel Bosque del Mar, Playa Hermosa y desarrollando un proyecto de renovación total que se extendió por los próximos 5 años.	Guanacaste	(+506) 2672 0046	ventas@bosquedelmar.com	24 Horas	https://cf.bstatic.com/images/hotel/max1024x768/511/51168179.jpg	https://bosquedelmar.com/wp-content/uploads/2017/10/LG_Bosque_del_mar.png	Renovamos todas las habitaciones transformándolas en Junior suites, construimos un área de piscina y jacuzzi, mejorando progresivamente la calidad de nuestros servicios más adelante, durante el 2008 terminamos las suites vista al jardín y frente al mar, además del edificio principal de 3 plantas que alberga el restaurante, el lounge bar, sala de eventos y un piso Penthouse.	https://www.youtube.com/embed/yQJv-cMceKw?rel=0	https://bosquedelmar.com/	playa	Hotel	112995374
16	Hotel Selva Verde Lodge	Selva Verde es más que un albergue y más que una reserva de selva tropical, es su puerta de entrada a un mundo mágico de imponentes árboles almendro, monos aulladores de manto y tucanes de pico de quilla, sumérjase en la naturaleza tropical mientras camina por el bosque verde oscuro o reflexiona tranquilamente en una cómoda hamaca, reavive su sentido de la maravilla y descubra la experiencia fuera de lo común de Selva Verde.  Ubicado a solo 2 horas de San José, Selva Verde brinda fácil acceso a las maravillas de la selva tropical. Durante más de 30 años, hemos sido un paraíso para los amantes de la naturaleza de todo el mundo. Nuestra abundante biodiversidad, nuestro cómodo albergue en la selva tropical y nuestras emocionantes actividades son ideales para los buscadores de aventuras, observadores de aves y vida silvestre, estudiantes y familias. Ven a explorar las 500 acres de naturaleza tropical vibrante de Selva Verde en el corazón del condado de Sarapiquí en Costa Rica 	Limon	(+506) 2761 1800	reservaciones@selvaverde.com	24 Horas	https://images.visitarcostarica.com/selva-verde-lodge-costa-rica.jpg	https://www.selvaverde.com/images/SVLTOPLOGO.png	Recientemente, nuestro personal observó una bandada de aves de especies mixtas cerca de los bungalows, que incluía algunos visitantes de aves que normalmente son difíciles de ver a tan corta distancia. ¡Felicitaciones al Equipo Sarapiquí, que registró la friolera de 380 especies de aves en el Gran Día de octubre! 	https://www.youtube.com/embed/BfgO6ZK46RY?rel=0	https://www.selvaverde.com/es/	playa	Hotel	2267880638
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

SELECT pg_catalog.setval('public.pymes_id_seq', 16, true);


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

