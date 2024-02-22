export type RootStackParamList = {
	Home: undefined;
	Welcome: undefined;
	Login: undefined;
	Register: undefined;
};

export type MomentStackParamList = {
	Feed: undefined;
	Search: undefined;
};

export type ProfileStackParamList = {
	Notification: undefined;
	Main: undefined;
	Setting: undefined;
	Edit: undefined;
};

export type RecordStackParamList = {
	Diet: undefined;
	DietRecord: { date: string; type: string };
	History: undefined;
	Sports: undefined;
	SportsRecord: undefined;
};
