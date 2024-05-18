import React from "react"

const ProfileView = ({self}) => {
	return (
		<div className="w-full flex-auto text-center items-center mt-5">
			<h1>Hello world // Profile View {self ? "// Requires Auth" : ""}</h1>
		</div>
	)
}

export default ProfileView