import del from 'del';
import {log, colors} from 'gulp-util';

/**
 * Deletes directories based on the pattern using del
 *
 * @param {string|string[]} cleanPatterns A list of glob patterns to delete
 * @param {object} options The options object
 * @param {object} options.clean Will skip clean if false, useful for skipping clean as a dependant task
 * @returns {function} The gulp task
 */
export default function(cleanPatterns, options = { clean: true }) {
	return function cleanTask() {
		// skip clean unless clean flag provided
		if (!options.clean) {
			log('clean: disabled');
			return null;
		}

		log(colors.blue('clean: starting'));

		return del(cleanPatterns).then(function delThen(paths) {
			if (paths.length) {
				log(colors.yellow('clean: files/folders'));
				paths.forEach(function pathsForEach(path) {
					log(colors.red('clean: del ' + path));
				});
			}
			log(colors.green('clean: complete'));
		});
	};
};
