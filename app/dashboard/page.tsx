import SignOutButton from "../../components/SignOutButton"
import  middleware  from '../middleware';
export default function home() {
    return (<>
        hello this is dashboard.
        <SignOutButton/>
    </>)
}

// export const getServerSideProps = async (context) => {
//     return authenticate(context);
//   };