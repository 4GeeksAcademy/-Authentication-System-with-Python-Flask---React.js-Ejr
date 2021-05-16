import React from "react";
import { ClientProfile } from "../component/clientProfile";
import { SellerProfile } from "../component/sellerProfile";

export const Profile = () => {
	return (
		<div className="container fixed-content-mg mx-auto d-block">
			<ClientProfile />
		</div>
	);
};
