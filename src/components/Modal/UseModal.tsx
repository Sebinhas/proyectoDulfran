import { useState } from 'react';

interface ModaliOptions {	[key: string]: any; 	}
interface ModalSize 	{	[key: string]: string; 	}

const UseModal = (options: ModaliOptions = {}) =>{
	const [isOpen, setIsOpen] = useState(false);
	let classModal = ''
	const modalSizes: ModalSize = {
		sm: 'max-w-[400px]',
		md: 'max-w-[700px]',
		lg: 'max-w-[1000px]',
	};

	if (options.style) {
		classModal = `bg-white flex flex-col  rounded-lg p-2 ${options.style}`;
	} else {
		classModal = `w-full bg-white flex flex-col  rounded-lg p-2 ${ options.size?modalSizes[options.size]:modalSizes.md}`;
	}

	const toggleModal = (): void => {
		setIsOpen(true);
	};

	const closeModalAction = (): void =>{		
		if (options.action) {options.action();}
		setIsOpen(false)
	}

	return {
		isOpen,
		toggleModal,
		closeModalAction,
		classModal,
		setIsOpen,
		modalSizes,
	}

};

export default UseModal;