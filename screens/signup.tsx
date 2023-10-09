import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fbSignup } from "../../FbConfig/firebasemethods";
import MNInput from "../../Components/MNInput";
import MNButton from "../../Components/MNButton";

export default function Signup() {
    const [model, setModel] = useState<any>({});

    const fillModel = (key: string, val: any) => {
        model[key] = val;
        setModel({ ...model });
    };

    const navigate = useNavigate();

    let signUpUser = () => {
        console.log(model);
        fbSignup(model)
            .then((res: any) => {
                navigate("/login");
                console.log(res);
            }).catch((err: any) => {
                console.log(err);
            });
    };

    return (
        <>
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-screen flex justify-center items-center">
                <div className="w-[400px] bg-[rgba(255,255,255,.2)] p-10 rounded-lg">
                    <div className="py-5">
                        <h1 className="text-3xl font-medium">Sign Up</h1>
                    </div>
                    <div className="py-3">
                        <MNInput
                            value={model.userName}
                            onChange={(e: any) => fillModel("userName", e.target.value)}
                            label="User Name"
                        />
                    </div>
                    <div className="py-3">
                        <MNInput
                            value={model.email}
                            onChange={(e: any) => fillModel("email", e.target.value)}
                            label="Email"
                        />
                    </div>
                    <div className="py-3">
                        <MNInput
                            value={model.password}
                            onChange={(e: any) => fillModel("password", e.target.value)}
                            label="Password"
                        />
                    </div>
                    <div className="py-3">
                    <select className="w-100 p-3 bg-transparent" value={model.role} onChange={(e:any)=>fillModel("role",e.target.value)}>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                    </div>
                    <div className="py-3">
                        <MNButton onClick={signUpUser} label="Sign Up" />
                    </div>
                </div>
            </div>
        </>
    );
}