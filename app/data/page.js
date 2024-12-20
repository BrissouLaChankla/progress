import Data from '@/models/Data';
import connect from "@/models/connect"

export default async function page() {
    await connect()
    const data = await Data.find();
    return (
        <div className="max-w-screen-lg mx-auto mt-10 lg:mt-20 ">
            <div className="overflow-x-auto">
                <table className="table table-xs">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Date</th>
                            <th>Chess (elo)</th>
                            <th>Duolingo (xp)</th>
                            <th>Money (€)</th>
                            <th>League of legends (elo)</th>
                            <th>Sport (séances)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.reverse().map((el, i) =>
                                <tr key={el._id}>
                                    <th>{i + 1}</th>
                                    <td>{new Date(el.date).toLocaleDateString("FR")}</td>
                                    <td>{el.chess}</td>
                                    <td>{el.duolingo}</td>
                                    <td>{el.money}</td>
                                    <td>{el.lol}</td>
                                    <td>{el.sport}</td>
                                </tr>
                            )
                        }

                    </tbody>

                </table>
            </div>
        </div>
    )
}
