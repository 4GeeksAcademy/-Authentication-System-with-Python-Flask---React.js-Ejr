import React from 'react'

export const Teachers = () => {
  return (
    <div className=" containerd-flex  justify-content-center p-4">
            <table className="table mx-auto ">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last name</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>First</td>
                        <td>teacher</td>
                        <td>@facebook</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>second</td>
                        <td>teacher</td>
                        <td>@instagram</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>third</td>
                        <td>teacher</td>
                        <td>@twitter</td>
                    </tr>
                </tbody>
            </table>

        </div>
  )
}

export default Teachers