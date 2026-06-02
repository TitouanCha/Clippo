import React from "react"

type Props = {
    questionTab: string[],
    handleRepons: (responsIndex: number) => void
}

export function ResponseButtons({ questionTab, handleRepons }: Props) {
    return (
        <div className="w-full">
            <div className="flex flex-row gap-2 w-full justify-center">
                <button className="btn btn-outline btn-warning btn-sm"
                    onClick={() => handleRepons(0)}
                >{questionTab[0]}</button>
                <button className="btn btn-outline btn-warning btn-sm"
                   onClick={() => handleRepons(1)}
                >{questionTab[1]}</button>
            </div>
            <div className="flex flex-row gap-2 w-full justify-center">
                <button className="btn btn-outline btn-warning btn-sm"
                    onClick={() => handleRepons(2)}
                >{questionTab[2]}</button>
                <button className="btn btn-outline btn-warning btn-sm"
                    onClick={() => handleRepons(3)}
                >{questionTab[3]}</button>
            </div>
        </div>
    )
}