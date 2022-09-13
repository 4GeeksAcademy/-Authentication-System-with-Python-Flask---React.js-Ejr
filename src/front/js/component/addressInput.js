import React, { useContext } from "react";
import useInput from "./useInput";
import "../../styles/addressInput.css";
import { Context } from "../store/appContext";

export const AddressInput = () => {
  const address = useInput("");
  const { store, actions } = useContext(Context);
  return (
    <>
      <input
        placeholder="Address"
        {...address}
        isTyping={address.value !== ""}
      />
      {address.suggestions?.length > 0 && (
        <div className="suggestion-box">
          {address.suggestions.map((suggestion, index) => {
            return (
              <div
                className="suggestion"
                key={index}
                onClick={() => {
                  address.setValue(suggestion.place_name);
                  localStorage.setItem("longitude", suggestion.center[0]);
                  localStorage.setItem("latitude", suggestion.center[1]);
                  localStorage.setItem("direccion", suggestion.place_name);
                  address.setSuggestions([]);
                }}
              >
                {suggestion.place_name}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

// const Wrapper = styled.div`
//   font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
//     Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
//   margin: 0 auto;
// `;

// const Input = styled.input`
//   width: 400px;
//   background: white;
//   border: none;
//   padding: 10px 20px;
//   border-radius: 30px;
//   position: relative;
//   display: grid;
//   justify-self: center;
//   &:focus {
//     outline: none;
//     border-radius: ${(props) => props.isTyping && "10px 10px 0px 0px"};
//   }
// `;
