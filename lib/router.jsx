const publicRoutes = FlowRouter.group({name : 'public'});

const authenticatedRoutes = FlowRouter.group({name: 'authenticated'});

publicRoutes.route('/', {
	name:'Index',
	action(){

		ReactLayout.render(MainLayout, {
          indexheader: <IndexLayout />
}); }
});

authenticatedRoutes.route('/dashboard', {
	name:'Dashboard',
	action(params) {
		renderLayoutWith(<Dashboard />)
	}
});

authenticatedRoutes.route("/task", {
	name: "task",
	action(params) {
		renderLayoutWith(<TaskTable />)
	}
});

authenticatedRoutes.route("/rewards", {
	name: "task",
	action(params) {
		renderLayoutWith(<RewardsContent />)
	}
});

authenticatedRoutes.route("/habit", {
	name: "dash",
	action(params) {
		renderLayoutWith(<HabitContent />)
	}
});

function renderLayoutWith(component){
	ReactLayout.render(MainLayout, {
		sendhome: <IndexLayout/>,
		nav: <Nav />,
		head: <Head />,
		content: component
	});
}