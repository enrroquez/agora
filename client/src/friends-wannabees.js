import {useDispatch, useSelector} from "react-redux";

export default function FriendsAndWannabees() {
    //add a ruote in APPS that links to this component
    const dispatch=useDispatch();

    const wannabees= useSelector(state=>state.friendsWannabees&&
        )




    useEffect(()=>{

        dispatch(receive)
    })

    return (
        <section>
            <h1>Friends></h1>
            <h1>Wannabees</h1>
            {wannabees.map((wannabee)=>{
                return(
                    <div key={wannabee.id}>
                        <button onClick={()=>handle Accept(wannabee.id)}>Accept</button>
                    </div>
                )
            }           )}
        </section>
    );
}
