import { useEffect, useState } from 'react';
import { tesloApi } from '../../../api/teslo.api';

export const RequestInfo = () => {
	const [info, setInfo] = useState<unknown>('Error');

    const getInfo = async () => {
        try {
            const {data } = await tesloApi.get('/auth/private');

            setInfo(data)
        } catch (error) {
            setInfo(error)
        }
    }

	useEffect(() => {
		getInfo();
	}, []);

	return (
		<>
			<h2>Informacion</h2>

			<pre>{JSON.stringify(info, null, 2)}</pre>
		</>
	);
};
