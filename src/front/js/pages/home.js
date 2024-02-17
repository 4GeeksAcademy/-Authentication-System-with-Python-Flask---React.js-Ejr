import React, { useContext } from "react";
import { Context } from "../store/appContext";
import jumbotron from "../../img/jumbotron.png";
import "../../styles/home.css";
import "../../img/jumbotron.png"

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<div>
				<img src="../../img/jumbotron.png"></img>
			</div>
			<div className="history-title"><h3>HISTORY OF THE MET</h3></div>
			<div className="history">
				<p>The Metropolitan Museum of Art's earliest roots date back to 1866 in Paris, France, when a group of Americans agreed to create a "national institution and gallery of art" to bring art and art education to the American people. The lawyer John Jay, who proposed the idea, swiftly moved forward with the project upon his return to the United States from France. Under Jay's presidency, the Union League Club in New York rallied civic leaders, businessmen, artists, art collectors, and philanthropists to the cause. On April 13, 1870, The Metropolitan Museum of Art was incorporated, opening to the public in the Dodworth Building at 681 Fifth Avenue. On November 20 of that same year, the Museum acquired its first object, a Roman sarcophagus. In 1871, 174 European paintings, including works by Anthony van Dyck, Nicolas Poussin, and Giovanni Battista Tiepolo, entered the collection.

On March 30, 1880, after a brief move to the Douglas Mansion at 128 West 14th Street, the Museum opened to the public at its current site on Fifth Avenue and 82nd Street. The architects Calvert Vaux and Jacob Wrey Mould designed the initial Ruskinian Gothic structure, the west facade of which is still visible in the Robert Lehman Wing. The building has since expanded greatly, and the various additions—built as early as 1888—now completely surround the original structure.

The Museum's collection continued to grow throughout the rest of the 19th century. The 1874–76 purchase of the Cesnola Collection of Cypriot art—works dating from the Bronze Age to the end of the Roman period—helped to establish The Met's reputation as a major repository of classical antiquities. When the American painter John Kensett died in 1872, 38 of his canvases came to the Museum, and in 1889, the Museum acquired two works by Édouard Manet.

The Museum's Beaux-Arts Fifth Avenue facade and Great Hall, designed by the architect and founding Museum Trustee Richard Morris Hunt, opened to the public in December 1902. The Evening Post reported that at last New York had a neoclassical palace of art, "one of the finest in the world, and the only public building in recent years which approaches in dignity and grandeur the museums of the old world."

By the 20th century, the Museum had become one of the world's great art centers. In 1907, the Museum acquired a work by Auguste Renoir, and in 1910, The Met was the first public institution in the world to acquire a work of art by Henri Matisse. The ancient Egyptian hippopotamus statuette that is now the Museum's unofficial mascot, "William," entered the collection in 1917. Today, virtually all of the Museum's 26,000 ancient Egyptian objects, the largest collection of Egyptian art outside of Cairo, are on display. By 1979, the Museum owned five of the fewer than 35 known paintings by Johannes Vermeer, and now The Met's 2,500 European paintings comprise one of the greatest such collections in the world. The American Wing now houses the world's most comprehensive collection of American paintings, sculpture, and decorative arts.

Other major collections belonging to the Museum include arms and armor, the arts of Africa, Oceania, and the Americas, ancient Near Eastern art, Asian art, costume, drawings and prints, European sculpture and decorative arts, Greek and Roman art, Islamic art, medieval art, modern and contemporary art, musical instruments, photographs, and the Robert Lehman Collection.

Today, tens of thousands of objects are on view at any given time in the Museum's two-million-square-foot building.

A comprehensive architectural plan for the Museum by the architects Kevin Roche John Dinkeloo and Associates was approved in 1971 and completed in 1991. Among the additions to the Museum as part of the master plan are the Robert Lehman Wing (1975), which houses an extraordinary collection of Old Masters, as well as Impressionist and Post-Impressionist art; The Sackler Wing (1978), which houses the Temple of Dendur; The American Wing (1980), whose diverse collection includes 25 recently renovated period rooms; The Michael C. Rockefeller Wing (1982) displaying the arts of Africa, Oceania, and the Americas; the Lila Acheson Wallace Wing (1987) of modern and contemporary art; and the Henry R. Kravis Wing (1991) devoted to European sculpture and decorative arts from the Renaissance to the beginning of the 20th century.

With the expansion of the building complete, The Met has continued to refine and reorganize its collection. In 1998, the Arts of Korea gallery opened to the public, completing a major suite of galleries devoted to the arts of Asia. The Ancient Near Eastern Art galleries reopened to the public in 1999 following a renovation. In 2007, several major projects at the south end of the building were completed, most notably the 15-year renovation and reinstallation of the entire suite of Greek and Roman Art galleries. Galleries for Oceanic and Native North American Art also opened in 2007, as well as the new Galleries for Nineteenth- and Early Twentieth-Century Paintings and Sculpture and the Ruth and Harold D. Uris Center for Education.

On November 1, 2011, the Museum's New Galleries for the Art of the Arab Lands, Turkey, Iran, Central Asia, and Later South Asia opened to the public. On the north side of the Museum, The Met's New American Wing Galleries for Paintings, Sculpture, and Decorative Arts reopened on January 16, 2012, signaling the completion of the third and final phase of The American Wing's renovation.

In May 2021, The Met installed a plaque on the Fifth Avenue facade recognizing Lenapehoking, the homeland of the Indigenous Lenape peoples.</p>
			</div>
		</div>
	);
};
