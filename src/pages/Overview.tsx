import axios, { isAxiosError } from 'axios';
import { useLoading } from '../context';
import { useEffect } from 'react';
import GroupsItem from '../components/GroupsItem';

export default function Overview() {
    const { changeLoadingStatus } = useLoading();

    useEffect(() => {
        (async () => {
            try {
                const url = `${import.meta.env.VITE_BASE_URL}/user/getAllGroups`;
                changeLoadingStatus(true);
                const response = await axios.get(url, { withCredentials: true });

                console.log(response.data.groups);
            } catch (err) {
                if (isAxiosError(err)) {
                    console.log(err.response?.data.message);
                }

                console.log(err);
            } finally {
                changeLoadingStatus(false);
            }
        })();
    }, [changeLoadingStatus]);

    return (
        <div className="flex size-full flex-col gap-5 lg:flex-row lg:justify-between lg:gap-0">
            <GroupsItem
                name="Group"
                img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYhMQ5XV2jsvaxUqzdbtLUJ_cbaQYCdR4ORw&s"
                description="group description test test test test test group description group description"
                id="694b583274d448760590de7d"
                className='h-75'
            />
            <GroupsItem
                name="Group"
                img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYhMQ5XV2jsvaxUqzdbtLUJ_cbaQYCdR4ORw&s"
                description="group description test test test test test group description group description"
                id="694b583274d448760590de7d"
                className='h-75'

            />
            <GroupsItem
                name="Group"
                img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYhMQ5XV2jsvaxUqzdbtLUJ_cbaQYCdR4ORw&s"
                description="group description test test test test test group description group description"
                id="694b583274d448760590de7d"
                className='h-75'

            />
            <GroupsItem
                name="Group"
                img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYhMQ5XV2jsvaxUqzdbtLUJ_cbaQYCdR4ORw&s"
                description="group description test test test test test group description group description"
                id="694b583274d448760590de7d"
                className='h-75'

            />
            <GroupsItem
                name="Group"
                img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYhMQ5XV2jsvaxUqzdbtLUJ_cbaQYCdR4ORw&s"
                description="group description test test test test test group description group description"
                id="694b583274d448760590de7d"
                className='h-75'

            />
        </div>
    );
}
