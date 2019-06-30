var tree_data = {};
var new_child_id = 0;

document.addEventListener('DOMContentLoaded', function () {
	renderDecisionTree();
});

function renderDecisionTree() {
	if(tree_data.value === undefined) {
		if(document.getElementById('create_tree_btn') === null) {
			var create_tree = document.createElement('div');
			create_tree.setAttribute('id', 'create_tree_box');
			create_tree.innerHTML = '<button id="create_tree_btn">Create Tree</button>';
			document.body.appendChild(create_tree);
			document.getElementById('create_tree_btn').addEventListener('click', function () {
				tree_data['child'] = [];
				tree_data['value'] = new_child_id++;
				renderNodes(tree_data, document.body);
				document.getElementById('create_tree_btn').style.display = 'none';
			});
		} else {
			document.getElementById('create_tree_btn').style.display = 'block';
		}
	} else {
		document.getElementById('create_tree_btn').style.display = 'block';
	}
}

function renderNodes(current_node, parentNode) {
		if(current_node.value !== undefined) {
			var create_node = document.createElement('div');
			create_node.setAttribute('class', 'node_box');
			create_node.setAttribute('data-val', current_node.value);
			var child_nodes = document.createElement('div');
			for(var i=0;i<current_node.child.length;i++) {
				renderNodes(current_node.child[i], child_nodes);
			}
			create_node.innerHTML = '<div class="node_div"><button class="create_child_btn">Add Child</button><button class="delete_child_btn">Delete Node</button></div>';
			create_node.appendChild(child_nodes);
			parentNode.appendChild(create_node);
			initiateCreateChildBtn();
		} else {
			return false;
		}
}

function initiateCreateChildBtn() {
	document.querySelectorAll('.create_child_btn').forEach(function (item) {
		item.addEventListener('click', function () {
			var child_count = prompt("No of children", "1");
			searchAndAddChildNodes(tree_data, parseInt(item.parentNode.parentNode.getAttribute('data-val')), child_count);
		});
	});
	document.querySelectorAll('.delete_child_btn').forEach(function (item) {
		item.addEventListener('click', function () {
			if(tree_data.value === parseInt(item.parentNode.parentNode.getAttribute('data-val'))) {
				tree_data = {};
				document.body.innerHTML = '';
				renderDecisionTree();
			} else {
				searchAndDeleteNode(tree_data, parseInt(item.parentNode.parentNode.getAttribute('data-val')));
			}
		});
	});
}

function searchAndAddChildNodes(search_node, search_val, child_count) {
	if(search_node.value == search_val) {
		for(var i=0;i<child_count;i++) {
			var child_object = {};
			child_object['value'] = new_child_id++;
			child_object['child'] = [];
			search_node.child.push(child_object);
		}
		document.body.innerHTML = '';
		renderNodes(tree_data, document.body);
	} else {
		for(var i=0;i<search_node.child.length;i++) {
			searchAndAddChildNodes(search_node.child[i], search_val, child_count);
		}
	}
}

function searchAndDeleteNode(delete_node, delete_val) {
	var flag = true;
	for(var i=0;i<delete_node.child.length;i++) {
		if(delete_node.child[i].value === delete_val) {
			delete_node.child.splice(i, 1);
			flag = false;
			break;
		}
	}
	if(flag) {
		for(var i=0;i<delete_node.child.length;i++) {
			searchAndDeleteNode(delete_node.child[i], delete_val);
		}
	} else {
		document.body.innerHTML = '';
		renderNodes(tree_data, document.body);
	}
}