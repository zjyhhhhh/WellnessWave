export const formatDateToShortMonthDay = (dateString: string) => {
	const [year, month, day] = dateString.split("-");
	const date = new Date(+year, +month - 1, +day);
	const formattedDate = date.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
	});

	return formattedDate;
}

export const generateDateRange = (startDate: Date, endDate: Date) => {
	const dates = [];
	let currentDate = new Date(startDate);

	while (currentDate <= endDate) {
		dates.push(currentDate.toISOString().split("T")[0]);
		currentDate.setDate(currentDate.getDate() + 1);
	}

	return dates;
}