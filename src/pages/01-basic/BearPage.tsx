import { useShallow } from 'zustand/shallow';
import { WhiteCard } from '../../components';
import { useBeatsStore } from '../../stores';

export const BearPage = () => {
	return (
		<>
			<h1>Contador de Osos</h1>
			<p>Manejo de estado simple de Zustand</p>
			<hr />

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
				<BlackBears />

				<PolarBears />

				<PandaBears />

				<BearsDisplay />
			</div>
		</>
	);
};

export const BlackBears = () => {
	const blackBears = useBeatsStore((state) => state.blackBears);
	const increaseBlackBears = useBeatsStore(
		(state) => state.increaseBlackBears,
	);

	return (
		<WhiteCard centered>
			<h2>Osos Negros</h2>

			<div className="flex flex-col md:flex-row">
				<button onClick={() => increaseBlackBears(1)}> +1</button>
				<span className="text-3xl mx-2 lg:mx-10"> {blackBears} </span>
				<button onClick={() => increaseBlackBears(-1)}>-1</button>
			</div>
		</WhiteCard>
	);
};

export const PolarBears = () => {
	const polarBears = useBeatsStore((state) => state.polarBears);
	const increasePolarBears = useBeatsStore(
		(state) => state.increasePolarBears,
	);

	return (
		<WhiteCard centered>
			<h2>Osos Polares</h2>

			<div className="flex flex-col md:flex-row">
				<button onClick={() => increasePolarBears(1)}> +1</button>
				<span className="text-3xl mx-2 lg:mx-10"> {polarBears} </span>
				<button onClick={() => increasePolarBears(-1)}>-1</button>
			</div>
		</WhiteCard>
	);
};

export const PandaBears = () => {
	const pandaBears = useBeatsStore((state) => state.pandaBears);
	const increasePandaBears = useBeatsStore(
		(state) => state.increasePandaBears,
	);

	return (
		<WhiteCard centered>
			<h2>Osos Pandas</h2>

			<div className="flex flex-col md:flex-row">
				<button onClick={() => increasePandaBears(1)}> +1</button>
				<span className="text-3xl mx-2 lg:mx-10"> {pandaBears} </span>
				<button onClick={() => increasePandaBears(-1)}>-1</button>
			</div>
		</WhiteCard>
	);
};

export const BearsDisplay = () => {
	const bears = useBeatsStore(useShallow((state) => state.bears));
	const doNothing = useBeatsStore((state) => state.doNothing);
  const addBear = useBeatsStore((state) => state.addBear);
  const clearBears = useBeatsStore((state) => state.clearBears);

	return (
		<WhiteCard>
			<h1>Osos</h1>

			<button onClick={doNothing}>Do nothing</button>
      <button className='mt-2' onClick={addBear}>Add Bear</button>
      <button className='mt-2' onClick={clearBears}>Clear bears</button>

			{bears.map((bear) => (
				<div key={bear.id}>
					<h3>{bear.name}</h3>
				</div>
			))}
		</WhiteCard>
	);
};
