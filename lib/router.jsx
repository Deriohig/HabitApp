
FlowRouter.route('/', {
	name:'Index',
	action(){

		ReactLayout.render(IndexLayout, {
          indexheader: <IndexHeader />
}); }
});

FlowRouter.route('/dashboard', {
	name:'Dashboard',
	action(params) {
		renderLayoutWith(<Dashboard />)
	}
});

FlowRouter.route("/task", {
	name: "task",
	action(params) {
		renderLayoutWith(<TaskTable />)
	}
});

FlowRouter.route("/habit", {
	name: "dash",
	action(params) {
		renderLayoutWith(<HabitContent />)
	}
});

function renderLayoutWith(component){
	ReactLayout.render(MainLayout, {
		nav: <Nav />,
		head: <Head />,
		content: component
	});
}