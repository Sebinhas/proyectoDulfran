import { useEffect } from "react";
import { UsersDTO } from "../../DTOUser";


const ViewDetailUser = (props: any) => {

    useEffect(() => {
        console.log(props.user);
    }, [props.user]);

return (
    <div>
      <div>ViewDetailUser</div>
      <div>{}</div>
    </div>
  )
}

export default ViewDetailUser;