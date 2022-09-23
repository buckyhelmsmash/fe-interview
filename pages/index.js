import Wrapper from "../components/Wrapper";
import {useCustomer} from "../utils/fetcher";
import React, {useContext, useState} from "react";
import {DeletedCustomer} from "./_app";
import {Badge, Button, Table} from "antd";
import router from "next/router";

export default function Home() {
    const {deletedCustomer, setDeletedCustomer} = useContext(DeletedCustomer)

    const [page, setPage] = useState(1)
    console.log("❄️ deletedCustomer", deletedCustomer)
    const {customer} = useCustomer(page)
    const filteredCustomer = customer?.data?.filter((cust) => {
        return !deletedCustomer.includes(cust?.id)
    })
    console.log("❄️filteredCustomer", filteredCustomer)
    const columns = [
        {
            title: 'Customer',
            key: 'customer',
            render: function dsiplayCustomer(_, record) {
                const splitted = record?.name.split(" ")
                const tag = []
                splitted.map(text => {
                    tag.push(text.replace('.', "").toLowerCase())
                })
                const finalTag = '@'+tag.join("_")
                return(
                    <div className={"flex flex-col"}>
                        <span>
                            {record?.name}
                        </span>
                        <span>
                            {finalTag}
                        </span>
                    </div>
                )
            },
        },
        {
            title: 'Status',
            key: 'status',
            render: function displayStatus(_, record) {
                return(
                    <Badge text={record?.status} color={record?.status === "active" ? "green" : "red"}/>
                )
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: function displayAction(_, record){
                return(
                    <Button type={"primary"} size={"small"} shape={"rect"} onClick={() => router.push(`customer/${record?.id}`)}>
                        View Customer
                    </Button>
                )
            }
        }
    ]
    return (
        <Wrapper title={"List Customer"}>
            <Table
                columns={columns}
                dataSource={filteredCustomer}
                pagination={{
                    current: customer?.meta?.pagination?.page,
                    total: customer?.meta?.pagination?.total,
                    showTotal: false,
                    showSizeChanger: false,
                    onChange: (page) => {
                        setPage(page)
                    }
                }}
            />
        </Wrapper>
    );
}
