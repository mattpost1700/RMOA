import React from "react";
import KeyPadButton from "./KeyPadButton";
class ButtonContainer extends React.Component{
    render(){
        return(
        <div>
            <table>
                <tbody>
                <tr>
                    <td>
                        <KeyPadButton label={7}/>
                    </td>
                    <td>
                        <KeyPadButton label={8}/>
                    </td>
                    <td>
                        <KeyPadButton label={9}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <KeyPadButton label={4}/>
                    </td>
                    <td>
                        <KeyPadButton label={5}/>
                    </td>
                    <td>
                        <KeyPadButton label={6}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <KeyPadButton label={1}/>
                    </td>
                    <td>
                        <KeyPadButton label={2}/>
                    </td>
                    <td>
                        <KeyPadButton label={3}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <KeyPadButton label={0}/>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        )
    }
}
export default ButtonContainer