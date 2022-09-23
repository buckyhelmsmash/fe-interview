import router, {useRouter} from "next/router";
import Wrapper from "../../components/Wrapper";
import {useCustomer, useCustomerDetail} from "../../utils/fetcher";
import {Button} from "antd";
import {useContext} from "react";
import {DeletedCustomer} from "../_app";

const Detail = () => {
    const {deletedCustomer, setDeletedCustomer} = useContext(DeletedCustomer)

    const id = useRouter().query?.id
    const {detail} = useCustomerDetail(id)
    console.log("❄️ detail", detail)

    const onDelete = async () => {
        setDeletedCustomer([...deletedCustomer, detail?.data?.id])
        await router.push('/')
    }
    const Detail =({title, data}) => {
        return(
            <div className={"flex flex-col gap-0 w-full"}>
                <span className={"text-amber-500 font-bold text-lg"}>{title}</span>
                <div>{data}</div>
            </div>
        )
    }
    const splitted = detail?.data?.name.split(" ")
    const tag = []
    splitted?.map(text => {
        tag.push(text.replace('.', "").toLowerCase())
    })
    const finalTag = '@'+tag.join("_")
    return(
        <Wrapper title={"Customer Details"}>
            <div className={"grid grid-cols-2"}>
                <div className={"flex flex-col gap-8 w-full"}>
                    <Detail title={"Full Name"} data={detail?.data?.name}/>
                    <Detail title={"Account ID"} data={finalTag}/>
                    <Detail title={"Gender"} data={detail?.data?.gender}/>
                    <Detail title={"Email"} data={detail?.data?.email}/>
                </div>

                <div className={"flex flex-col gap-4 w-full justify-between"}>
                    <Detail
                        title={"Status Account"}
                        data={
                            <div className={`w-full border-2 text-center p-1 ${detail?.data?.status === 'active' ? 'border-[#5eba7d] text-[#5eba7d]' : 'border-[#ff7875] text-[#ff7875]'}`}>
                                {detail?.data?.status}
                            </div>
                        }
                    />
                    <div className={"flex flex-col gap-4"}>
                        <Button
                            block
                            type={"primary"}
                            onClick={async () => await router.push("/")}
                        >
                            RETURN TO LIST CUSTOMER
                        </Button>
                        <Button
                            block
                            type={"danger"}
                            onClick={onDelete}
                        >
                            DELETE CUSTOMER
                        </Button>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default Detail
