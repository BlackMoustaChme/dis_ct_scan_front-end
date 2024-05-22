import React from "react";

function Column({value, ...props}) {

    return (
        <table>
            <tbody>
            {value.map((value)=>
                // <tr key={}> needed
                <tr>
                    <td>
                        {value}
                    </td>
                </tr>
            )}
            </tbody>
        </table>
    )

}

export default Column;