import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fbLogin } from "../../FbConfig/firebasemethods";
import MNInput from "../../Components/MNInput";
import MNButton from "../../Components/MNButton";


export default function Login() {
    const [model, setModel] = useState<any>({});
    const navigate = useNavigate()

    const fillModel = (key: string, val: any) => {
        model[key] = val;
        setModel({ ...model });
    };

    let LoginUser = () => {
        console.log(model);
        fbLogin(model)
            .then((res:any) => {
                console.log(res);
                if(res.role == 'admin'){
                    navigate('/protected')
                }else if(res.role == 'user'){
                    navigate('/user1')
                }
              
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return <>
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-screen flex justify-center items-center">
                <div className="w-[400px] bg-[rgba(255,255,255,.2)] p-10 rounded-lg">
                    <div className="py-5">
                        <h1 className="text-3xl font-medium">Login</h1>
                    </div>

                    <div className="py-4">
                        <MNInput
                           
                            value={model.email}
                            onChange={(e: any) => fillModel("email", e.target.value)}
                            label="Email"
                        />
                    </div>
                    <div className="py-4">
                        <MNInput
                            value={model.password}
                            onChange={(e: any) => fillModel("password", e.target.value)}
                            label="Password"
                        />
                    </div>
                    <div className="py-4">
                        <MNButton onClick={LoginUser} label="Sign In" />
                    </div>
                    <div className="">
                        <p>Not Signed In Yet? <button onClick={() => navigate('/')} className="btn text-white mb-1">Sign Up</button> </p>
                    </div>
                </div>
            </div>
        </>
    
}